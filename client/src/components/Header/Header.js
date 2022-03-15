import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import "./Header.css";
import logo from "../../images/logo.svg";
import SideBar from "../SideBar/SideBar";
import SearchPostsContext from "../../context/SearchPostsContext";
import LoginButton from "../LoginButton/LoginButton";
import LogoutButton from "../LogoutButton/LogoutButton";
export default function Header() {
  const { getPosts } = useContext(SearchPostsContext);
  const { user } = useAuth0();
  let searchValue;
  return (
    <React.Fragment>
      <div className="headerGrid">
        <Link to="/">
          <img src={logo} alt="8knot logo" className="logo" />
        </Link>
        <div className="TopBar">
          <div>
            <input
              placeholder="search in 8knot"
              className="searchField"
              name="term"
              onChange={(e) => (searchValue = e.target.value)}
            />
            <button
              className="searchMsgButton"
              onClick={() => {
                getPosts(searchValue);
              }}
            >
              Search
            </button>
          </div>
          <SideBar />
          <div>
            {user && <div>Hello, {user.name}</div>}
            {!user && (
              <div>
                <LoginButton />
                <Link to="/SignUp">/Sign up</Link>
              </div>
            )}
            {user && <LogoutButton />}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
