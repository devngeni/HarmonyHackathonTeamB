/** @format */

import { ethers } from "ethers";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import Myprofile from "./Myprofile";
import NFTMarketplace from "../../Marketplace.json";
import "./Myprofile.css";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const ResellNfts = () => {
  const [formInput, updateFormInput] = useState({ price: "", image: "" });
  const [data, updateData] = useState({});
  const [dataFetched, updateDataFetched] = useState(false);
  const [busy, setBusy] = useState(false);

  const { image, price } = formInput;

  async function fetchNFT(tokenId) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      NFTMarketplace.address,
      NFTMarketplace.abi,
      signer
    );

    const tokenURI = await contract.tokenURI(tokenId);
    const imageUri = tokenURI.slice(7);
    const data = await fetch(`https://nftstorage.link/ipfs/${imageUri}`);
    const json = await data.json();
    const str = json.image;
    const mylink = str.slice(7);
    const imageX = "https://nftstorage.link/ipfs/" + mylink.replace("#", "%23");
    let item = {
      price: json.price,
      tokenId: tokenId,
      image: imageX,
      name: json.name,
      description: json.description,
    };
    updateDataFetched(true);

    updateData(item);
    // setImage(image);
    updateFormInput((state) => ({ ...state, image: image }));
  }

  async function listNFTForSale(tokenId) {
    try {
      if (!price) return;
      setBusy(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const priceFormatted = ethers.utils.parseEther(
        formInput.price.toString()
      );
      let contract = new ethers.Contract(
        NFTMarketplace.address,
        NFTMarketplace.abi,
        signer
      );
      let listingPrice = await contract.getListingPrice();

      listingPrice = listingPrice.toString();
      let transaction = await contract.resellToken(tokenId, priceFormatted, {
        value: listingPrice,
      });
      await transaction.wait();
      setBusy(false);
      setTimeout(function () {
        window.location.href = "/yournfts";
      }, 2000);
    } catch (error) {
      setBusy(false);
      toast.error(error.code);
    }
  }

  const search = useLocation().search;
  const tokenId = new URLSearchParams(search).get("tokenId");
  if (!dataFetched) fetchNFT(tokenId);

  return (
    <section id="reselling">
      <Myprofile />
      <Leftbar />
      <Navbar />
      <div className="resellNFT_Area">
        <div className="resell_container">
          <div className="lets_resell">
            <img
              src={data.image}
              alt={data.image}
              className="lets_resell_image"
            />
          </div>
          <div className="lets_resell_previousPrice">
            Previous price {`: ${data.price} ONE`}
          </div>

          <button className="resellBTN" onClick={() => listNFTForSale(tokenId)}>
            {busy ? <Spinner /> : "re-sell"}
          </button>
          <div className="lets_resell_updatePrice">
            update price
            <br />
            <input
              type="text"
              placeholder="new nft price"
              className="priceUpdate_input"
              value={formInput.price}
              id={formInput.price}
              onChange={(e) =>
                updateFormInput({ ...formInput, price: e.target.value })
              }
            ></input>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResellNfts;
