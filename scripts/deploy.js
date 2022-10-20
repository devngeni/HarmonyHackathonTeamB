const { ethers } = require("hardhat");
const hre = require("hardhat");


async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deployed contracts with the accounts:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());

  const StakingRewards = await ethers.getContractFactory("StakeHarmony");

  const staking = await StakingRewards.deploy();

  await staking.deployed();
  console.log("Contract deployed to address:", staking.address);
  
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });