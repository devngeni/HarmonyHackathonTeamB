const { ethers } = require("hardhat");
const hre = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer:", deployer.address);

//   console.log("Account balance:", (await deployer.getBalance()).toString());

  const harmonFactory = await ethers.getContractFactory("Harmony");

  const harmonyToken = await harmonFactory.deploy();

  await harmonyToken.deployed();
  console.log("Token Contract deployed to address:", harmonyToken.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });