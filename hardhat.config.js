/** @type import('hardhat/config').HardhatUserConfig */
require("dotenv").config();

const harmony_private_key=process.env.HARMONY_PRIVATE_KEY

module.exports = {
  solidity: "0.8.17",
  network: {
    testnet: {
      url: 'https://api.s0.b.hmny.io',
      accounts: [`0x${harmony_private_key}`]
    }
  }
};
