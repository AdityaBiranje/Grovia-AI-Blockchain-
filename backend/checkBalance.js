// backend/checkBalance.js
require('dotenv').config();
const { ethers } = require('ethers');
const fs = require('fs');

async function main() {
  const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL || 'http://127.0.0.1:8545');
  const artifact = JSON.parse(fs.readFileSync('../artifacts/contracts/CarbonToken.sol/CarbonToken.json', 'utf8'));
  const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, artifact.abi, provider);
  const address = process.argv[2];
  if (!address) {
    console.log("Usage: node checkBalance.js <address>");
    process.exit(1);
  }
  const bal = await contract.balanceOf(address);
  console.log("Balance (tokens):", bal.toString());
}
main().catch(console.error);

