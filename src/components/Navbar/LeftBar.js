/** @format */

import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { GiMonkey } from "@react-icons/all-files/gi/GiMonkey";
import { RiAccountBoxFill } from "@react-icons/all-files/ri/RiAccountBoxFill";
import { GiCash } from "@react-icons/all-files/gi/GiCash";

const Leftbar = () => {
  return (
    <div className="leftBar">
      <button className="Myprofile_button_">
        <NavLink activeclassname="activebtn" to="/yournfts">
          <RiAccountBoxFill /> My Profile
        </NavLink>
      </button>
      <button className="Nfts_button_">
        <NavLink activelassname="activebtn" to="/collections">
          <GiMonkey /> Nfts
        </NavLink>
      </button>
      <button className="Staking_btn">
        <NavLink activeclassname="activebtn" to="/">
          <GiCash /> Stakings
        </NavLink>
      </button>
    </div>
  );
};
export default Leftbar;
