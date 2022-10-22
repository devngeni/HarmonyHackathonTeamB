//require("@nomicfoundation/hardhat-toolbox");
const fs = require("fs");
require("dotenv").config();
// require("@nomiclabs/hardhat-waffle");
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});
/** @type import('hardhat/config').HardhatUserConfig */
const HARMONY_PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    testnet: {
      url: `https://api.s0.b.hmny.io`,
      accounts: [`0x${HARMONY_PRIVATE_KEY}`]
    }
    // mainnet: {
    //   url: `https://api.harmony.one`,
    //   accounts: [`0x${HARMONY_PRIVATE_KEY}`]
    // }
  }
};
