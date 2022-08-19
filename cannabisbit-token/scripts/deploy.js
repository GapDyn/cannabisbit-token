const hre = require("hardhat");

async function main() {

  const [deployer,] = await ethers.getSigners();
  console.log('DEPLOYER: ',deployer.address);

  const CannabisBit = await hre.ethers.getContractFactory("CannabisBit");
  const cannabisBit = await CannabisBit.deploy();
  await cannabisBit.deployed();
  try{await hre.run("verify:verify", {address: cannabisBit.address});}catch(e){}

  console.log("CannabisBit deployed:", cannabisBit.address);

}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
