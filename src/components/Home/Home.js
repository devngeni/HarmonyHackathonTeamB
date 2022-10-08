/** @format */

import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

const Home = () => {
  return (
    <section id="Home">
      <div className="Page">
        <Navbar/>
        <div className="ExploreTxt">
          Explore NFTs <br />
          <br />
          THE_NFTS is your home to Web3. <br />
          Track your wallets. Follow other wallets. <br />
          Discover NFTs
        </div>
        <div className="specialImage"></div>
      </div>
    </section>
  );
};
export default Home;
