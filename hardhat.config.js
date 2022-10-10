require("@nomicfoundation/hardhat-toolbox");
const fs = require("fs");
require("dotenv").config();
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      chainId: 1337
    },
    goerli: {
      url: process.env.ALCHEMY_API_URL,
      accounts: [process.env.PRIVATE_KEY]
    }
  },
  solidity: "0.8.17",
  settings: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
