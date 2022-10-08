/** @format */

import React from "react";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import Myprofile from "./Myprofile";
import "./Myprofile.css";

const TxHistory = () => {
  return (
    <section id="txhistory">
      <Myprofile />
      <Leftbar />
      <Navbar/>
      <div className="resellNFT_Area"></div>
    </section>
  );
};

export default TxHistory;
