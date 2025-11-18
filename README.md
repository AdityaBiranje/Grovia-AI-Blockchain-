

# 🚀 **Grovia – Intelligence That Sustains Trust**

### *AI-Driven Carbon Credit Verification Using Blockchain, ML & Real-Time Forensics*

Grovia is a high-impact, full-stack sustainability platform that verifies carbon offset project authenticity using **AI anomaly detection** and **blockchain-based tokenization**, ensuring trust, transparency, and fraud-proof carbon markets.

This project integrates:

* **Machine Learning** (Fraud Detection + CO₂ Prediction)
* **Blockchain Smart Contracts** (ERC-20 Carbon Token)
* **FastAPI ML Microservice**
* **Node.js Backend + MongoDB**
* **Modern 3D Animated Frontend (React + Vite + Three.js)**
* **User Dashboard + Admin Dashboard**
* **Minting Carbon Tokens Only After AI Approval**

---

## 🧠 Problem Statement

The carbon credit market faces major issues:

* Fake or inflated carbon claims
* Phantom CO₂ reductions
* Manual auditing with slow verification
* No transparency on how credits are issued
* No decentralized accountability

**Grovia solves this by verifying carbon projects using ML anomaly detection and recording approved credits on the blockchain.**

---

## 🌍 Vision

To build a globally scalable, fraud-proof, AI-assisted sustainability platform where:

* Carbon credits are verified scientifically
* AI models detect anomalies instantly
* Blockchain ensures transparency & immutability
* Stakeholders trust the system without intermediaries

---

# 🧬 **System Architecture**

```
 ┌──────────────────────────────────────────────────────┐
 │                      FRONTEND                        │
 │ React + Vite + Three.js (3D Animations)              │
 │ User Dashboard | Admin Dashboard | Submissions UI    │
 └───────────────────────────────┬──────────────────────┘
                                 │ REST API Calls
                                 ▼
 ┌──────────────────────────────────────────────────────┐
 │                     BACKEND (Node.js)                │
 │ Express Server + MongoDB                             │
 │ - Save Submissions                                   │
 │ - Call ML Service                                    │
 │ - Decide Minting Logic                               │
 │ - Admin Overrides                                    │
 └───────────────────────────────┬──────────────────────┘
                                 │ HTTP Predict
                                 ▼
 ┌──────────────────────────────────────────────────────┐
 │                     ML SERVICE (FastAPI)             │
 │ Isolation Forest + StandardScaler                    │
 │ - CO₂ Prediction                                      │
 │ - Fraud Probability                                   │
 │ - Outlier Detection                                   │
 └───────────────────────────────┬──────────────────────┘
                                 │ Contract Call
                                 ▼
 ┌──────────────────────────────────────────────────────┐
 │                 BLOCKCHAIN (Ethereum)                │
 │ Hardhat + Solidity                                   │
 │ ERC20 CarbonToken.sol                                │
 │ Only mints tokens if fraud score is low              │
 └──────────────────────────────────────────────────────┘
```

---

# 🔥 **Key Features**

## 👤 **User Features**

* Submit new carbon projects
* Real-time ML verification
* View fraud score & predicted CO₂ reduction
* Track past submissions
* Download IPFS metadata
* Wallet integration
* Personalized dashboard

## 🛡️ **Admin Features**

* View all submissions
* Approve or reject using admin override
* Mint carbon tokens manually
* Review flagged projects
* Full audit history

---

# 🛠️ **Tech Stack**

## **Frontend**

* React + Vite
* TailwindCSS
* Framer Motion
* Three.js (3D animations similar to MetaMask fox)
* Axios
* Glassmorphism UI + Neon Glow Theme

## **Backend**

* Node.js + Express
* MongoDB + Mongoose
* Ethers.js
* IPFS metadata support
* Admin authentication

## **Machine Learning**

* FastAPI
* Python 3.x
* Scikit-learn (Isolation Forest, LOF, StandardScaler)
* Joblib
* Numpy / Pandas

## **Blockchain**

* Solidity
* Hardhat
* OpenZeppelin ERC20 Contracts
* Local Hardhat Node / Sepolia Testnet

---

# 🧪 **ML Model Details**

### **Inputs**

* `energy_generated_kwh`
* `weather_score`
* `grid_emission_factor`

### **Outputs**

* `predicted_co2_tons`
* `fraud_score_percent`
* `df_score` (depth factor from Isolation Forest)

### **Fraud Score Calculation**

```
fraud_score = abs(df_score * 3000) % 100
```

### Interpretation

| Fraud % | Meaning                |
| ------- | ---------------------- |
| < 30%   | Safe / Genuine project |
| 30–60%  | Needs review           |
| > 60%   | High fraud probability |

---

# 📦 Installation & Setup

## 1. Clone Repository

```bash
git clone https://github.com/AdityaBiranje/Grovia.git
cd Grovia
```

---

## 2. Setup ML Service

```bash
cd ml
python3 -m venv venv_ml
source venv_ml/bin/activate
pip install -r requirements.txt
uvicorn app:app --reload --port 8001
```

---

## 3. Setup Blockchain

```bash
cd smart-contracts
npm install
npx hardhat node
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address → paste into backend `.env`.

---

## 4. Setup Backend

```bash
cd backend
npm install
cp .env.example .env   # create your env file
node index.js
```

---

## 5. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🔗 API Routes

### **POST /submit**

Submit a new project for ML scoring + blockchain minting.

### **GET /submissions?owner=0x123...**

Get submissions of a user.

### **POST /admin/mint**

Admin-triggered minting.

### **POST /admin/override**

Force approve / reject.

---

# 🤝 Contributions

PRs are welcome.
Before submitting, run:

```bash
npm run lint
npm run format
```

---

# 📜 License

MIT License

---

# 💡 Acknowledgements

* OpenAI / ChatGPT assistance for architecture guidance
* OpenZeppelin Contracts
* Scikit-learn

---

# ⭐ If you like this project

Star the repo ⭐ on GitHub to support it!

---
