/** @format */

import React, { useEffect, useRef, useState } from "react";
import Leftbar from "../Navbar/LeftBar";
import Navbar from "../Navbar/Navbar";
import "./nfts.css";
import NftsBar from "./NftsBar";
import Marketplace from "../../Marketplace.json";
import { ethers } from "ethers";
import { NFTStorage, File } from "nft.storage";
import Spinner from "../MyProfile/Spinner";
import { toast } from "react-toastify";
const NEW_TOKEN_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDViOTg4Q0U4NjZBMkQxNTZmNDI5QTcwZDQ5OWExNDM3NmIwNERBOGMiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjczNDAxMDk1MSwibmFtZSI6ImNvaW5iYXNlbmZ0In0._E1KnvPg0cJ44QtGx8LN-ZwoZ6CaxkCWybUiOFknVkw";

const Mint = () => {
  const [IPFSuploading, setIPFSuploading] = useState(false);
  const [IPFSerror, setIPFSerror] = useState(null);
  const [busy, setBusy] = useState(false);
  const [formParams, updateFormParams] = useState({
    name: "",
    description: "",
    price: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const inputFileRef = useRef(null);

  function inputFileHandler() {
    if (selectedFile) {
      setSelectedFile(null);
    } else {
      inputFileRef.current.click();
    }
  }

  async function IPFSupload(data, file) {
    try {
      setIPFSerror(null);
      setIPFSuploading(true);
      const client = new NFTStorage({
        token: NEW_TOKEN_KEY,
      });

      const metadata = await client.store({
        name: data.name,
        description: data.description,
        price: data.price,
        image: new File([file], file.name, { type: file.type }),
      });
      console.log("IPFS URL for the metadata:", metadata.url);
      console.log("metadata.json contents:\n", metadata.data);
      console.log("metadata.json with IPFS gateway URLs:\n", metadata.embed());
      return metadata.url;
    } catch (error) {
      toast.error(error);
      setIPFSerror(error);
    } finally {
      setIPFSuploading(false);
    }
  }

  const MintNfts = async (metadataURL) => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      let contract = new ethers.Contract(
        Marketplace.address,
        Marketplace.abi,
        signer
      );

      let listingPrice = await contract.getListingPrice();
      listingPrice = listingPrice.toString();
      let transaction = await contract.createToken(
        metadataURL,
        ethers.utils.parseEther(formParams.price.toString()),
        {
          value: listingPrice,
        }
      );
      toast.info("...minting has started");
      await transaction.wait();
      updateFormParams({ name: "", description: "", price: "" });
      selectedFile === null;
      toast.success("Mint Successfull !");
      setBusy(false);
    } catch (error) {
      if (error) {
        toast.error("failed " + error.code).toLowerCase();
        setBusy(false);
      }
    }
  };

  async function mintNFThandler() {
    const { name, description, price } = formParams;

    if (!name) {
      return toast.warn("NFT Name should not be empty");
    } else if (!description) {
      return toast.warn("NFT Description should not be empty");
    } else if (!selectedFile) {
      return toast.warn("Select a file to upload");
    } else if (!price) {
      return toast.warn("price should be included");
    }

    try {
      if (formParams.price < 0.01) {
        toast.warn("minimum price is 0.01");
      } else {
        const url = await IPFSupload(
          {
            name,
            description,
            price,
          },
          selectedFile
        );
        await MintNfts(url);
      }
    } catch (error) {
      toast.error("failed " + error.code).toLowerCase();
      setBusy(false);
    }
  }

  useEffect(() => {
    if (IPFSuploading) {
      setBusy(true);
      toast.info("Uploading");
    }
  }, [IPFSuploading]);

  useEffect(() => {
    if (IPFSerror) {
      toast.error(IPFSerror.code);
      setBusy(false);
    }
  }, [IPFSerror]);

  return (
    <section id="Mintnfts">
      <Leftbar />
      <Navbar />
      <div className="mint_page">
        <div className="forms_container">
          <div className="forms_container_nftname">NFT name</div>
          <input
            type="text"
            placeholder="nftname"
            className="forms_container_nftname_input"
            value={formParams.name}
            id={formParams.name}
            onChange={(e) =>
              updateFormParams({ ...formParams, name: e.target.value })
            }
          />
          <div className="forms_container_description">Description</div>
          <textarea
            minLength="10"
            required
            cols="10"
            rows="5"
            type="text"
            placeholder="nft description"
            className="forms_container_description_textarea"
            id={formParams.description}
            value={formParams.description}
            onChange={(e) =>
              updateFormParams({ ...formParams, description: e.target.value })
            }
          />
          <div className="forms_container_price">Price</div>
          <input
            type="text"
            placeholder="price"
            className="forms_container_price_input"
            pattern="^\d*(\.\d{0,4})?$"
            step=".01"
            id={formParams.price}
            value={formParams.price}
            onChange={(e) =>
              updateFormParams({ ...formParams, price: e.target.value })
            }
          />
          <div className="select_nft">
            Select file
            <br />
            <input
              ref={inputFileRef}
              type="file"
              onChange={(e) => setSelectedFile(e.target.files[0])}
              onClick={inputFileHandler}
            ></input>
          </div>
          <button className="mintButton" onClick={mintNFThandler}>
            {busy ? <Spinner /> : "Mint"}
          </button>
        </div>
      </div>
      <NftsBar />
    </section>
  );
};

export default Mint;
