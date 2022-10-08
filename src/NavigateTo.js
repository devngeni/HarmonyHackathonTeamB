/** @format */

import React from "react";
import { Route, Routes } from "react-router-dom";
import Myprofile from "./components/MyProfile/Myprofile";
import ResellNfts from "./components/MyProfile/ResellNfts";
import TxHistory from "./components/MyProfile/TxHistory";
import Yournfts from "./components/MyProfile/Yournfts";
import Leftbar from "./components/Navbar/LeftBar";
import Navbar from "./components/Navbar/Navbar";

const NavigateTo = () => {
  return (
    <div>
      <Routes>
        <Route path="yournfts" element={<Yournfts />} />
        <Route path="txhistory" element={<TxHistory />} />
        <Route path="reselling" element={<ResellNfts />} />
      </Routes>
      <Myprofile />
      <Navbar />
      <Leftbar />
      <TxHistory />
      <Yournfts />
      <ResellNfts />
    </div>
  );
};

export default NavigateTo;
