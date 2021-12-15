import React from "react";
import "./Header.css";
import logo from "../../images/logo.svg";
import envelope from "./icons/dms.svg";
import home from "./icons/home2.svg";
import account from "./icons/account.svg";
export default function Header() {
  return (
    <React.Fragment>
      <div className="headerGrid">
        <img src={logo} alt="8knot logo" className="logo" />
        <div className="TopBar">
          <div className="fieldandbutton">
            <form>
              <input placeholder="search field" className="searchField" />
              <button type="submit">search</button>
            </form>
          </div>
          <img src={envelope} alt="direct mesages" className="dms" />
          <img src={home} alt="home" className="home" />
          <img src={account} alt="personal account" className="account" />
        </div>
      </div>
    </React.Fragment>
  );
}
