import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";

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
            <select className="searchFilter" name="searchFilter">
              <option value="all">...</option>
              <option value="windowCleaning">Window Cleaning</option>
              <option value="Sealing">Sealing</option>
              <option value="Painting">Painting</option>
              <option value="Concrete Reconstruction">
                Concrete Reconstruction
              </option>
            </select>
          </form>
          <p>Log In / Sign-Up</p>
        </div>
      </div>
    </React.Fragment>
  );
}
