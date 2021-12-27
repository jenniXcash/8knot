import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import SideBar from "../SideBar/SideBar";
export default function Header() {
  return (
    <React.Fragment>
      <div className="headerGrid">
        <Link to="/">
          <img src={logo} alt="8knot logo" className="logo" />
        </Link>
        <div className="TopBar">
          <form>
            <input placeholder="search field" className="searchField" />
            <button type="submit">search</button>
          </form>
          <SideBar />
          <p>Log In / Sign-Up</p>
        </div>
      </div>
    </React.Fragment>
  );
}
