/** @format */

import React, { useEffect, useState } from "react";
// import { NavLink } from "react-router-dom";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import Myprofile from "./Myprofile";
import "./Myprofile.css";
import NFTMarketplace from "../../Marketplace.json";
import { ethers } from "ethers";
import { NavLink } from "react-router-dom";

const Yournfts = () => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  // const router = useRouteLoaderData();
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      NFTMarketplace.address,
      NFTMarketplace.abi,
      signer
    );
    const data = await contract.fetchMyNFTs();

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
          tokenId: i.tokenId,
          seller: i.seller,
          owner: i.owner,
          image: imageX,
          name: json.name,
          description: json.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }

  return (
    <section id="yournfts">
      <Myprofile />

      <div className="resellNFT_Area">
        {loadingState === "loaded" && !nfts.length ? (
          <h5 className="loadingstate">no items to display!!</h5>
        ) : (
          <div className="my_content">
            {nfts.map((nft, i) => (
              <div key={i} className="myNFT">
                <img src={nft.image} alt={nft.name} className="list_nft" />
                <NavLink
                  activeclassname="active"
                  to={`/reselling?tokenId=${nft.tokenId}&tokenprice=${nft.price}&tokenUrl=${nft.image}`}
                >
                  <button className="listbtn">resell token</button>
                </NavLink>
              </div>
            ))}
          </div>
        )}
      </div>
      <Leftbar />
      <Navbar />
    </section>
  );
};
export default Yournfts;
