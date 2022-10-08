/** @format */
const { ethers } = require("ethers");
export const connectWallet = async () => {
  try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      const address = accounts[0];      
      return {address};
  } catch (error) {
    console.log(error);
  }
};

export async function getAccBl() {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://eth-goerli.g.alchemy.com/v2/sLQ6yaCH5ykUITWx8na3rGlXASlwN7Ia"
    );
    const items = await connectWallet();

    const bal = await provider.getBalance(items.address);
    const balance = parseFloat(ethers.utils.formatEther(bal)).toFixed(4);
    return { balance };

};
