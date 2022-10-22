/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.css";
import Logo from "./nft.jpeg";

const Home = () => {
  return (
    <section id="Home">
      <div className="page">
        <div className="page_content">
          <div className="ExploreTxt">
            Explore NFTs <br />
            <br />
            THE_NFTS is your home to Web3. <br />
            Track your wallets. Follow other wallets. <br />
            Discover NFTs
          </div>

          <NavLink activeclassname="active" to="/Collections">
            <button className="Explore_button">Explore</button>
          </NavLink>

          <img src={Logo} alt="here" className="specialImage"></img>
        </div>
      </div>
      <Navbar />
    </section>
  );
};
export default Home;
