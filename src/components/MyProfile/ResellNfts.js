/** @format */

import React from "react";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import Myprofile from "./Myprofile";
import "./Myprofile.css";

const ResellNfts = () => {
  
  return (
    <section id="reselling">
      <Myprofile />
      <Leftbar />
      <Navbar />
      <div className="resellNFT_Area">
        <div className="resell_container">
          <div className="lets_resell"></div>
          <div className="lets_resell_previousPrice">Previous price { `:${null}`}</div>
          <button className="resellBTN">Resell</button>
          <div className="lets_resell_updatePrice">
            update price<br/>
            <input
              type="text"
              placeholder="new nft price"
              className="priceUpdate_input"
            ></input>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResellNfts;
