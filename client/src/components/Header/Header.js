import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../images/logo.svg";
import SideBar from "../SideBar/SideBar";
import SearchPostsContext from "../../context/SearchPostsContext";
export default function Header() {
  const { getPosts } = useContext(SearchPostsContext);
  let searchValue;
  return (
    <React.Fragment>
      <div className="headerGrid">
        <Link to="/">
          <img src={logo} alt="8knot logo" className="logo" />
        </Link>
        <div className="TopBar">
          <input
            placeholder="search in 8knot"
            className="searchField"
            name="term"
            onChange={(e) => (searchValue = e.target.value)}
          />
          <button
            onClick={() => {
              getPosts(searchValue);
            }}
          >
            Search
          </button>
          <SideBar />
          <div>
            Log In/ <Link to="SignUp">Sign-Up</Link>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
