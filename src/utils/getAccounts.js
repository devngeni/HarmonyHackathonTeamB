/** @format */
const { ethers } = require("ethers");

// const { Harmony } = require("@harmony-js/core");
// const {
//   ChainID,
//   ChainType,
//   hexToNumber,
//   numberToHex,
//   fromWei,
//   Units,
//   Unit,
// } = require("@harmony-js/utils");

// const hmy = new Harmony("https://api.s0.b.hmny.io/", {
//   chainType: ChainType.Harmony,
//   chainId: ChainID.HmyTestnet,
// });

const toHex = (num) => {
  const val = Number(num);
  return "0x" + val.toString(16);
};

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
  // const provider = new ethers.providers.JsonRpcProvider(
  //   "https://api.s0.b.hmny.io"
  // );
  const items = await connectWallet();
  if (window.ethereum.networkVersion !== 1666700000) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: toHex(1666700000) }],
    });
  }
  const bal = hmy.blockchain.getBalance({
    address: items.address,
  });

  // const bal = await provider.getBalance(items.address);
  const balance = parseFloat(ethers.utils.formatEther(bal)).toFixed(4);
  return { balance };
}
