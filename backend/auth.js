// backend/auth.js
// WARNING: demo auth only. Replace with real auth in production.

const ADMIN_SECRET = process.env.ADMIN_SECRET || "supersecret";
const DEMO_USER = process.env.DEMO_USER || "user@test.com";
const DEMO_PASS = process.env.DEMO_PASS || "password123";

function simpleLogin(email, password, role) {
  // role = "admin" or "user"
  if (role === "admin") {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      // return a simple token (not secure)
      return Buffer.from(`${email}:${role}`).toString("base64");
    }
    return null;
  } else {
    if ((email === DEMO_USER && password === DEMO_PASS) || !email) {
      // allow anonymous demo user if no email provided
      return Buffer.from(`${email||"demo"}:${role||"user"}`).toString("base64");
    }
    return null;
  }
}

function adminOnly(req, res, next) {
  const secret = req.headers["x-admin-secret"] || req.body?.secret || req.query?.secret;
  if (!secret || secret !== ADMIN_SECRET) {
    return res.status(403).json({ error: "forbidden - admin secret required" });
  }
  next();
}

module.exports = { simpleLogin, adminOnly };
