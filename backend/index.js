// backend/index.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const axios = require("axios");
const bodyParser = require("body-parser");
const { connectContract, getContract } = require("./contract");
const Submission = require("./model");
const { adminOnly, simpleLogin } = require("./auth");

const app = express();
app.use(bodyParser.json({ limit: "1mb" }));

// CORS: allow dev frontends and production origin (set in .env)
const FRONTEND_ORIGINS = (process.env.FRONTEND_ORIGINS || "http://localhost:5173,http://localhost:5173")
  .split(",")
  .map(s => s.trim());
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (curl, server-to-server)
    if (!origin) return callback(null, true);
    if (FRONTEND_ORIGINS.indexOf(origin) !== -1) {
      return callback(null, true);
    } else {
      return callback(new Error("CORS not allowed"));
    }
  }
}));

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/carbon_proto";
const ML_URL = process.env.ML_URL || "http://127.0.0.1:8001/predict";
const FRAUD_THRESHOLD = Number(process.env.FRAUD_THRESHOLD ?? 40); // percent

// Connect Mongo
mongoose.set("strictQuery", false);
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => { console.error("Mongo connection error:", err); process.exit(1); });

// Connect contract (ethers)
(async () => {
  try {
    await connectContract();
    console.log("Contract helper initialized");
  } catch (e) {
    console.warn("Contract helper init failed — continue and retry on demand:", e.message);
  }
})();

// ---------- ROUTES ----------

// Health
app.get("/", async (req, res) => {
  return res.json({ ok: true, msg: "Grovia Backend OK" });
});

// Simple demo auth (replace in prod)
app.post("/auth/login", async (req, res) => {
  try {
    const { email, password, role } = req.body;
    const token = simpleLogin(email, password, role);
    if (!token) return res.status(401).json({ error: "invalid credentials" });
    res.json({ ok: true, token, role: role || "user" });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Submit project - main flow
app.post("/submit", async (req, res) => {
  try {
    const payload = req.body;
    // Basic validation (frontend should validate too)
    const required = ["projectId", "name", "location", "energy_generated_kwh", "weather_score", "grid_emission_factor", "ownerAddress"];
    for (let f of required) {
      if (payload[f] === undefined || payload[f] === null || payload[f] === "") {
        return res.status(400).json({ error: `missing ${f}` });
      }
    }

    // Create initial DB record
    const doc = new Submission({
      projectId: payload.projectId,
      name: payload.name,
      location: payload.location,
      energy_generated_kwh: Number(payload.energy_generated_kwh),
      weather_score: Number(payload.weather_score),
      grid_emission_factor: Number(payload.grid_emission_factor),
      ownerAddress: payload.ownerAddress,
      ipfsHash: payload.ipfsHash || null,
      createdAt: new Date(),
      minted: { ok: false }
    });
    await doc.save();

    // Call ML service
    // --- replace existing ML call block with this ---
const mlReqBody = {
  // ML expects snake_case keys
  project_id: doc.projectId,
  energy_generated_kwh: Number(doc.energy_generated_kwh),
  weather_score: Number(doc.weather_score),
  grid_emission_factor: Number(doc.grid_emission_factor)
};

let mlResponse = null;
try {
  const mlRes = await axios.post(ML_URL, mlReqBody, {
    headers: { "Content-Type": "application/json" },
    timeout: 20000
  });
  mlResponse = mlRes.data;
} catch (mlErr) {
  console.warn("ML call failed:", mlErr.message, mlErr?.response?.data || "");
}


    // Update DB with ML output (if any)
    if (mlResponse) {
      doc.ml = {
        raw: mlResponse.raw || mlResponse,
        fraud_score_percent: Number(mlResponse.fraud_score_percent ?? mlResponse.fraud_score ?? 100),
        predicted_co2_tons: Number(mlResponse.predicted_co2_tons ?? 0)
      };
      await doc.save();
    }

    // Decide to mint or flag
    const fraud = (doc.ml && doc.ml.fraud_score_percent) ? doc.ml.fraud_score_percent : 100;
    if (fraud < FRAUD_THRESHOLD) {
      // attempt mint
      try {
        const contract = getContract();
        if (!contract) throw new Error("contract not initialized");
        // token amount logic: e.g., 1 token = 1 kg CO2 => convert tons to tokens example:
        const tokens = Math.round((doc.ml?.predicted_co2_tons ?? 0) * 1000); // kg
        const tx = await contract.mintForProject(doc.ownerAddress, tokens, doc.ipfsHash || "");
        const receipt = await tx.wait();
        doc.minted = {
          ok: true,
          tokensMinted: tokens,
          txHash: receipt.transactionHash,
          blockNumber: receipt.blockNumber,
          mintedAt: new Date()
        };
        await doc.save();
        return res.json({ ok: true, minted: doc.minted, ml: doc.ml });
      } catch (mintErr) {
        console.warn("Minting failed:", mintErr.message);
        doc.minted = { ok: false, error: mintErr.message };
        await doc.save();
        return res.json({ ok: false, error: "mint_failed", reason: mintErr.message, ml: doc.ml });
      }
    } else {
      // flagged for admin
      doc.minted = { ok: false, flagged: true };
      await doc.save();
      return res.json({ ok: false, flagged: true, ml: doc.ml });
    }

  } catch (err) {
    console.error("submit error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// List submissions (recent)
app.get("/submissions", async (req, res) => {
  try {
    const docs = await Submission.find({}).sort({ createdAt: -1 }).limit(200).lean();
    res.json(docs);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get single submission
app.get("/submission/:projectId", async (req, res) => {
  try {
    const doc = await Submission.findOne({ projectId: req.params.projectId }).lean();
    if (!doc) return res.status(404).json({ error: "not found" });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin: Get flagged submissions
app.get("/admin/flagged", adminOnly, async (req, res) => {
  try {
    const threshold = Number(process.env.FRAUD_THRESHOLD ?? FRAUD_THRESHOLD);
    const list = await Submission.find({
      "minted.ok": { $ne: true },
      "ml.fraud_score_percent": { $gte: threshold }
    }).sort({ createdAt: -1 }).limit(500).lean();
    res.json(list);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Admin override mint
app.post("/admin/override-mint", adminOnly, async (req, res) => {
  try {
    const { projectId, to, amount, ipfsHash, note } = req.body;
    if (!projectId || !to || !amount) return res.status(400).json({ error: "projectId,to,amount required" });

    const contract = getContract();
    if (!contract) return res.status(500).json({ error: "contract not initialized" });

    const tx = await contract.mintForProject(to, Number(amount), ipfsHash || "");
    const receipt = await tx.wait();

    await Submission.updateOne({ projectId }, {
      $set: {
        "minted.ok": true,
        "minted.tokensMinted": Number(amount),
        "minted.txHash": receipt.transactionHash,
        "minted.blockNumber": receipt.blockNumber,
        "minted.overrideBy": "admin",
        "minted.overrideNote": note || null,
        "minted.overrideAt": new Date()
      }
    });

    res.json({ ok: true, txHash: receipt.transactionHash });
  } catch (e) {
    console.error("override-mint:", e);
    res.status(500).json({ error: e.message });
  }
});

// Generic mint endpoint (admin/dev)
app.post("/mint", adminOnly, async (req, res) => {
  try {
    const { to, amount, ipfsHash } = req.body;
    if (!to || !amount) return res.status(400).json({ error: "to, amount required" });
    const contract = getContract();
    if (!contract) return res.status(500).json({ error: "contract not initialized" });
    const tx = await contract.mintForProject(to, Number(amount), ipfsHash || "");
    const receipt = await tx.wait();
    res.json({ ok: true, txHash: receipt.transactionHash, blockNumber: receipt.blockNumber });
  } catch (e) {
    console.error("mint error:", e);
    res.status(500).json({ error: e.message });
  }
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://127.0.0.1:${PORT}`);
});
