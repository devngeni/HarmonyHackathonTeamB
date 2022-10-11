/** @format */

import React, { useEffect, useState } from "react";
import { connectWallet } from "../../utils/getAccounts";
import "./Navbar.css";
import Drawer from "react-modern-drawer";
import { ImMenu } from "@react-icons/all-files/im/ImMenu";

//import styles 👇
import "react-modern-drawer/dist/index.css";

const Navbar = () => {
  const [address, setAddress] = useState();

  useEffect(() => {
    async function fetchData() {
      const items = await connectWallet();
      setAddress(
        String(items.address).substring(0, 5) +
          "..." +
          String(items.address).substring(40)
      );
    }
    fetchData();
  }, []);

  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="Top_bar">
      <div className="logo">THE_NFTS</div>
      <button className="menu" onClick={toggleDrawer}>
        <ImMenu />
      </button>
      <div>
        <Drawer
          open={isOpen}
          onClose={toggleDrawer}
          direction="left"
          className="drawerBar"
        >
          <button>Hello World</button>
          <br />
          <button>Hello World</button>
          <br />
          <button>Hello World</button>
          <br />
          <button>Hello World</button>
        </Drawer>
      </div>

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
