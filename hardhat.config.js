/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-chai-matchers");
require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

const harmony_private_key=process.env.HARMONY_PRIVATE_KEY

module.exports = {
  solidity: "0.8.7",
  network: {
    testnet: {
      url: 'https://api.s0.b.hmny.io',
      accounts: [`0x${harmony_private_key}`]
    }
  }
};
