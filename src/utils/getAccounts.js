/** @format */
import detectEthereumProvider from "@metamask/detect-provider";
const { Harmony } = require("@harmony-js/core");
const {
  ChainID,
  ChainType,
  hexToNumber,
  numberToHex,
  fromWei,
  Units,
} = require("@harmony-js/utils");
const hmy = new Harmony("https://api.s0.b.hmny.io/", {
  chainType: ChainType.Harmony,
  chainId: ChainID.HmyTestnet,
});

export const connectWallet = async () => {
  try {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    const address = accounts[0];

    return { address };
  } catch (error) {
    console.log(error);
  }
};

export async function getAccBl() {
  const items = await connectWallet();
  if (window.ethereum.networkVersion !== 1666700000) {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: numberToHex(1666700000) }],
    });
  }
  const response = await hmy.blockchain.getBalance({ address: items.address });
  const balance = parseFloat(
    fromWei(hexToNumber(response.result), Units.one)
  ).toFixed(4);
  return { balance };
}
