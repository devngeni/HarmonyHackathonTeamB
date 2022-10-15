/** @format */
const { ethers } = require("ethers");



export const connectWallet = async () => {
  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];   
    return { address };
  } catch (error) {
    console.log(error);
  }
};

export async function getAccBl() {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://api.s0.b.hmny.io"
  );
  const items = await connectWallet();

  const bal = await provider.getBalance(items.address);
  const balance = parseFloat(ethers.utils.formatEther(bal)).toFixed(4);
  return { balance };
}
