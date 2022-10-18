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
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default App;
