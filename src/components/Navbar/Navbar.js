/** @format */

import React, { useEffect, useState } from "react";
import { connectWallet } from "../../utils/getAccounts";
import "./Navbar.css";

const Navbar = () => {
  const [address, setAddress]=useState()


  useEffect( () => {
     async function fetchData() {
       const items = await connectWallet();
       setAddress(
         String(items.address).substring(0, 5) +
           "..." +
           String(items.address).substring(40)
       );
     }
     fetchData();
  },[])

  return (
    <div className="Top_bar">
      <div className="logo">THE_NFTS</div>
      {!address ? (
        <button className="connectwalletBTN" onClick={connectWallet}>
          connect Wallet
        </button>
      ) : (
        <button className="connectwalletBTN">{address}</button>
      )}
    </div>
  );
};

export default Navbar;
