/** @format */

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import "./nfts.css";
import NftsBar from "./NftsBar";
import NFTMarketplace from "../../Marketplace.json";
import { useParams } from "react-router-dom";
import Spinner from "../MyProfile/Spinner";
import Loader from "../../utils/Loader";
import { toast } from "react-toastify";

const Collection = () => {
  const [busy, setBusy] = useState(false);
  const [currAddress, updateCurrAddress] = useState("0x");
  const [dataFetched, updateDataFetched] = useState(false);
  const [data, setData] = useState([]);
  const [loadingState, setLoadingState] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      "https://api.s0.b.hmny.io"
    );

    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const contract = new ethers.Contract(
      NFTMarketplace.address,
      NFTMarketplace.abi,
      provider
    );
    const data = await contract.fetchMarketItems();
    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    setLoadingState(true);

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        const imageUri = tokenURI.slice(7);
        const data = await fetch(`https://nftstorage.link/ipfs/${imageUri}`);
        const json = await data.json();
        const str = json.image;
        const mylink = str.slice(7);
        const imageX =
          "https://nftstorage.link/ipfs/" + mylink.replace("#", "%23");

        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller.toUpperCase(),
          owner: i.owner.toUpperCase(),
          image: imageX,
          name: json.name,
          description: json.description,
        };
        return item;
      })
    );
    setData(items);
    updateCurrAddress(accounts[0].toUpperCase());
    updateDataFetched(true);
    setLoadingState(true);
  }

  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    try {
      setBusy(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        NFTMarketplace.address,
        NFTMarketplace.abi,
        signer
      );
      const salePrice = ethers.utils.parseUnits(nft.price, "ether");
      const transaction = await contract.createMarketSale(nft.tokenId, {
        value: salePrice,
      });
      await transaction.wait();
      loadNFTs();
      toast.success("transaction successful");
      setBusy(false);
    } catch (error) {
      toast.error(error.code);
      setBusy(false);
    }
  }
  const params = useParams();
  const tokenId = params.tokenId;
  if (!dataFetched) loadNFTs(tokenId);

  return (
    <section id="collections">
      <Leftbar />
      <Navbar />
      <div className="NFTS_page">
        {!loadingState ? (
          <button className="loader_spinner">
            <Loader />
          </button>
        ) : (
          <div className="content">
            {data.map((nft, index) => (
              <div key={index} className="nftcard">
                <img src={nft.image} alt={nft.name} className="N_F_T" />
                <div className="nftcard_price">{nft.price} ONE </div>
                <div className="nftcard_name">{nft.name}</div>

                {currAddress === nft.owner || currAddress === nft.seller ? (
                  <button className="nftcard_buyNft">You own this</button>
                ) : (
                  <button
                    className="nftcard_buyNft"
                    onClick={() => buyNft(nft)}
                  >
                    {busy ? <Spinner /> : "Buy"}
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      <NftsBar />
    </section>
  );
};

export default Collection;
