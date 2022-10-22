/** @format */

import React, { useState } from "react";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import "./ChainIds.css";

const ChainIds = () => {
  const [data, setData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);

  async function getChains() {
    const url = new URL(
      `https://api.covalenthq.com/v1/chains/?quote-currency=USD&format=JSON&key=ckey_dbdcb99dd52b4b5b987a52a4b91`
    );
    const response = await fetch(url);
    const result = await response.json();
    const data = result.data;
    const item = data.items;
    console.log(item);
    setData(item);
    setDataFetched(true);
    return item;
  }
  if (!dataFetched) {
    getChains();
  }
  return (
    <section id="Chains">
      <Leftbar />
      <Navbar />
      <div className="chainid_page">
        <div className="content_">
          {data.map((chains, i) => (
            <div key={i} className="chainidBox">
              <label className="networkname">{chains.label}</label>
              <img
                src={chains.logo_url}
                alt="not found"
                className="neticon"
              ></img>
              <label className="chain_id">
                chainId
                <br />
                <span className="nextline">{chains.chain_id}</span>
              </label>
              <label className="currency">
                currency
                <br />
                <span className="nextline">___</span>
              </label>
              <label className="link">
                {chains.is_testnet === true ? "testnet" : "Mainnet"}
              </label>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChainIds;
