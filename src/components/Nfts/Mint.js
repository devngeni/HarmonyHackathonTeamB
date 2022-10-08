/** @format */

import React, { useRef, useState } from "react";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import "./nfts.css";
import NftsBar from "./NftsBar";

const Mint = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);

  function inputFileHandler() {
    if (selectedFile) {
      setSelectedFile(null);
    } else {
      inputFileRef.current.click();
    }
  }
  return (
    <section id="Mintnfts">
      <Leftbar />
      <Navbar />
      <div className="mint_page">
        <div className="forms_container">
          <div className="forms_container_nftname">NFT name</div>
          <input
            type="text"
            placeholder="nftname"
            className="forms_container_nftname_input"
          />
          <div className="forms_container_description">Description</div>
          <textarea
            type="text"
            placeholder="nft description"
            className="forms_container_description_textarea"
          />
          {/*<div className="forms_container_price">Price</div>
          <input
            type="text"
            placeholder="nftname"
            className="forms_container_nftname_input"
          />*/}
          <div className="select_nft">
            Select file
            <br />
            <input
              ref={inputFileRef}
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              onClick={inputFileHandler}
            ></input>
          </div>
          <button className="mintButton">Mint</button>
        </div>
      </div>
      <NftsBar />
    </section>
  );
};

export default Mint;
