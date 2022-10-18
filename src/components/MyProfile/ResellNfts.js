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
  const [busy, setBusy] = useState(false);

  const { price } = formInput;

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
      toast.success("resold successfully");
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
  const previousPrice = new URLSearchParams(search).get("tokenprice");
  const tokenUrl = new URLSearchParams(search).get("tokenUrl").replace("#", "%23");
 
  return (
    <section id="reselling">
      <Myprofile />
      <Leftbar />
      <Navbar />
      <div className="resellNFT_Area">
        <div className="resell_container">
          <div className="lets_resell">
            <img src={tokenUrl} alt={tokenUrl} className="lets_resell_image" />
          </div>
          <div className="lets_resell_previousPrice">
            Previous price {`: ${previousPrice} ONE`}
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
