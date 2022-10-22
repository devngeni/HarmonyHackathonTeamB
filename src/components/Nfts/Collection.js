/** @format */

import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import "./nfts.css";
import NftsBar from "./NftsBar";
import NFTMarketplace from "../../Marketplace.json";
import { NavLink, useParams } from "react-router-dom";
import Spinner from "../MyProfile/Spinner";
import Loader from "../../utils/Loader";
import { toast } from "react-toastify";

const Collection = () => {
  const [busy, setBusy] = useState(false);
  const [currAddress, updateCurrAddress] = useState("0x");
  const [dataFetched, updateDataFetched] = useState(false);
  const [data, setData] = useState([]);

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
    const marketItems = await contract.fetchMarketItems();
    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      marketItems.map(async (i) => {
        const tokenURI = await contract.tokenURI(i.tokenId);
        const imageUri = tokenURI.slice(7);
        const metadata = await fetch(
          `https://nftstorage.link/ipfs/${imageUri}`
        );
        const json = await metadata.json();
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
        {!dataFetched ? (
          <button className="loader_spinner">
            <Loader />
          </button>
        ) : dataFetched && data.length ? (
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
        ) : dataFetched && !data.length ? (
          <button className="itemsfound">
            No market Items to display!!, <br />
            you may mint new items or
            <br /> resell from{" "}
            <NavLink className={"itemsfound_color"} to="/yournfts">
              My-profile
            </NavLink>
          </button>
        ) : (
          ""
        )}
      </div>
      <NftsBar />
    </section>
  );
};

export default Collection;
