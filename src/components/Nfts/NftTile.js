/** @format */

import React from "react";
import "./nfts.css";

function NFTTile(data) {
  return (
    <div className="nftcard">
      <img src={data.data.image} alt={data.data.name} className="N_F_T" />
      <div className="nftcard_price">{data.data.price} ONE </div>
      <div className="nftcard_name">{data.data.name}</div>
      <button className="nftcard_buyNft">BUY</button>
    </div>
  );
}

export default NFTTile;
