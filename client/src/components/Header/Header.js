import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import envelope from "./icons/dms.svg";
import home from "./icons/home2.svg";
import account from "./icons/account.svg";
import plus from "./icons/plus.svg";
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
          <Link to="/PostNew">
            <img src={plus} alt="add a new post" className="postNew" />
          </Link>
          <Link to="/Dms">
            <img src={envelope} alt="direct mesages" className="dms" />
          </Link>
          <Link to="/">
            <img src={home} alt="home" className="home" />
          </Link>
          <Link to="/Account">
            <img src={account} alt="personal account" className="account" />
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}
