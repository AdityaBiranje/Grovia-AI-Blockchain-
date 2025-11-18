async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  const Carbon = await ethers.getContractFactory("CarbonToken");
  const carbon = await Carbon.deploy("CarbonToken", "CO2T");
  await carbon.deployed();
  console.log("CarbonToken deployed to:", carbon.address);
}
main().catch((err) => { console.error(err); process.exit(1); });
