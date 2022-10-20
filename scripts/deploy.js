const { ethers } = require("hardhat");
const hre = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployer:", deployer.address);

  //Token contract address
  const harmonFactory = await ethers.getContractFactory("Harmony");

  const harmonyToken = await harmonFactory.deploy();

  await harmonyToken.deployed();

  console.log("Token Contract deployed to address:", harmonyToken.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  //Staking contract addresss
  const StakingRewards = await ethers.getContractFactory("StakeHarmony");

  const staking = await StakingRewards.deploy(harmonyToken.address);

  await staking.deployed();
  console.log("Staking Contract deployed to address:", staking.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });