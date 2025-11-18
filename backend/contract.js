// backend/contract.js
const { ethers } = require("ethers");
const fs = require("fs");
const path = require("path");

let provider, wallet, contract;

async function connectContract() {
  const rpc = process.env.RPC_URL || "http://127.0.0.1:8545";
  provider = new ethers.providers.JsonRpcProvider(rpc);

  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    console.warn("No PRIVATE_KEY in .env - contract interactions will fail");
    return;
  }
  wallet = new ethers.Wallet(privateKey, provider);

  const contractAddr = process.env.CONTRACT_ADDRESS;
  if (!contractAddr) {
    console.warn("No CONTRACT_ADDRESS in .env - cannot instantiate contract");
    return;
  }

  // load ABI: look into backend/abi/CarbonToken.json
  const abiPath = path.join(__dirname, "abi", "CarbonToken.json");
  if (!fs.existsSync(abiPath)) {
    throw new Error(`ABI not found at ${abiPath} - put your ABI there`);
  }
  const abiJson = JSON.parse(fs.readFileSync(abiPath, "utf8"));
  const abi = abiJson.abi || abiJson; // allow raw abi or artifact

  contract = new ethers.Contract(contractAddr, abi, wallet);
  return contract;
}

function getContract() {
  if (!contract) {
    throw new Error("contract not initialized - call connectContract() first");
  }
  return contract;
}

module.exports = { connectContract, getContract };
