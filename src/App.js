/** @format */

import React from "react";
import "./App.css";
import Home from "./components/Home/Home";
import { Route, Routes } from "react-router-dom";
import Yournfts from "./components/MyProfile/Yournfts";
import TxHistory from "./components/MyProfile/TxHistory";
import ResellNfts from "./components/MyProfile/ResellNfts";
import NavigateTo from "./NavigateTo";
import Collection from "./components/Nfts/Collection";
import Mint from "./components/Nfts/Mint";


const App = () => {
  return (
    <div>
      <Routes>
        
        <Route path="" element={<Home />} />
        <Route path="/Myprofile/*" element={<NavigateTo />} />
        <Route path="/yournfts" element={<Yournfts />} />
        <Route path="/txhistory" element={<TxHistory />} />
        <Route path="/reselling" element={<ResellNfts />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/Mintnfts" element={<Mint />} />
      </Routes>
    </div>
  );
}

export default App