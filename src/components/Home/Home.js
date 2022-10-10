/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Home.css";

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

          <div className="specialImage"></div>
        </div>
      </div>
      <Navbar />
    </section>
  );
};
export default Home;
