import React from 'react'
import { NavLink } from 'react-router-dom';
import './nfts.css'
import { TiCloudStorage } from "@react-icons/all-files/ti/TiCloudStorage";
import { MdCollections } from "@react-icons/all-files/md/MdCollections";


const NftsBar = () => {
  return (
    <div className="bar">
      <button className="collectionBtn">
        <NavLink activeclassname="active" to="/collections">
        <MdCollections /> Collections
        </NavLink>
      </button>
      <button className="mint_Page_Btn">
        <NavLink activeclassname="active" to="/Mintnfts">
          <TiCloudStorage /> Mint Nfts
        </NavLink>
      </button>
    </div>
  );
}

export default NftsBar