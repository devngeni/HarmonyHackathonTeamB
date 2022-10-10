/** @format */

import React, { useState } from "react";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import "./nfts.css";
import NftsBar from "./NftsBar";
import NFTTile from "./NftTile";

const Collection = () => {
  const sampleData = [
    {
      name: "NFT",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://i.pinimg.com/236x/b7/b6/5d/b7b65d8c3ed8b5f45486e0ca3eb3bd1f.jpg",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "NFT",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://i.pinimg.com/236x/b7/b6/5d/b7b65d8c3ed8b5f45486e0ca3eb3bd1f.jpg",
      price: "0.03ETH",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
    {
      name: "samudrop",
      description: "NFT artwork",
      website: "http://axieinfinity.io",
      image:
        "https://nftstorage.link/ipfs/bafybeibjo5wcxf7o5m5san7c6lvhrwszwbbffnlnrdjnmwuvocmc7j4nfa/samudrop.png",
      price: "0.03",
      currentlySelling: "True",
      address: "0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13",
    },
  ];
  const [data /*updateData*/] = useState(sampleData);

  return (
    <section id="collections">
      <Leftbar />
      <Navbar />
      <div className="NFTS_page">
        <div className="content">
          {data.map((value, index) => {
            return <NFTTile data={value} key={index}></NFTTile>;
          })}
        </div>
      </div>

      <NftsBar />
    </section>
  );
};

export default Collection;
