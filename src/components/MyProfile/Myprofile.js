/** @format */

import React, { useEffect, useState } from "react";
import "./Myprofile.css";
import { AiOutlineReload } from "@react-icons/all-files/ai/AiOutlineReload";
import { NavLink } from "react-router-dom";
import { connectWallet, getAccBl } from "../../utils/getAccounts";
import { generateRandomAvatarOptions } from "../../utils/avater.js";
import Avatar from "avataaars";
import Spinner from "./Spinner";

const Myprofile = () => {
  const [currentBalance, setCurrentBalance] = useState("");
  const [address, setAddress] = useState("");
  const [busy, setBusy] = useState(false);
  async function getBalance() {
    try {
      setBusy(true);
      await connectWallet();
      const items = await getAccBl();
      setCurrentBalance(items.balance);
      setBusy(false);
    } catch (error) {
      if (error) {
        setBusy(false);
      }
    }
  }
  async function getAddress() {
    try {
      setBusy(true);
      const _items = await connectWallet();
      setAddress(
        String(_items.address).substring(0, 4) +
          "..." +
          String(_items.address).substring(38)
      );
      setBusy(false);
    } catch (error) {
      if (error) {
        setBusy(false);
        alert(error.message);
      }
    }
  }

  useEffect(() => {
    getAddress();
    getBalance();
  }, []);

  return (
    <section id="Myprofile">
      <div className="Page">
        <div>
          <div className="wallet_icon">
            <div className="avater">
              <Avatar
                style={{ width: "100px", height: "100px" }}
                avatarStyle="Circle"
                {...generateRandomAvatarOptions()}
              />
            </div>
          </div>
          <div className="wallet_icon_address">{address}</div>
        </div>
        <div className="walletBal">
          <div className="walletBal_Networth">Net Worth</div>
          <div className="walletBal_alance">{currentBalance} ONE</div>
          <button className="walletBal_reloadBL" onClick={getBalance}>
            {busy ? <Spinner /> : <AiOutlineReload />}
          </button>
        </div>
        <button className="yournftBTN">
          <NavLink activeclassname="active" to="/yournfts">
            My Nfts
          </NavLink>
        </button>
        <button className="TxHistory">
          <NavLink activeclassname="active" to="/txhistory">
            TxHistory
          </NavLink>
        </button>
      </div>
    </section>
  );
};

export default Myprofile;
