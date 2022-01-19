import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import SideBar from "../SideBar/SideBar";
export default function Header({ setSearch }) {
  console.log("header render");
  return (
    <React.Fragment>
      <div className="headerGrid">
        <Link to="/">
          <img src={logo} alt="8knot logo" className="logo" />
        </Link>
        <div className="TopBar">
          <form>
            <input placeholder="search in 8knot" className="searchField" />
            <input
              type="submit"
              value="Search"
              onClick={() => {
                setSearch(document.querySelector(".searchField").value);
              }}
            />
          </form>
          <SideBar />
          <div>
            Log In/ <Link to="SignUp">Sign-Up</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
