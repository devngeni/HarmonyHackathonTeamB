import React from 'react'
import { NavLink } from 'react-router-dom';
import Leftbar from '../Navbar/LeftBar';
import Navbar from '../Navbar/Navbar';
import Myprofile from './Myprofile';
import './Myprofile.css'

const Yournfts = () => {
  return (
    <section id="yournfts">
      <Myprofile />

      <div className="resellNFT_Area">
        <div className="myNFT">
          <NavLink activeclassname="active" to="/reselling">
            <button className="listbtn">List</button>
          </NavLink>
        </div>
      </div>
      <Leftbar />
      <Navbar />
    </section>
  );
}
export default Yournfts