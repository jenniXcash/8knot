import "./SideBar.css";
import plus from "../../icons/plus-thick.svg";
import dms from "../../icons/email-outline.svg";
import home from "../../icons/home.svg";
import account from "../../icons/account.svg";
import SideBarPop from "./componenets/SideBarPop/SideBarPop";
import { Link } from "react-router-dom";
import { useState } from "react";

export default function SideBar() {
  const [detector, setDetector] = useState(false);
  return (
    <div className="sideBar">
      <div className="icons">
        <Link to="/">
          <img
            src={home}
            alt="home screen"
            className="sidebarIcon"
            onMouseOver={() => setDetector("home")}
            onMouseOut={() => setDetector(false)}
          />
        </Link>
        <Link to="PostNew">
          <img
            src={plus}
            alt="Add a new post"
            className="sidebarIcon"
            onMouseOver={() => setDetector("addPost")}
            onMouseOut={() => setDetector(false)}
          />
        </Link>
        <Link to="Dms">
          <img
            src={dms}
            alt="Inbox"
            className="sidebarIcon"
            onMouseOver={() => setDetector("dms")}
            onMouseOut={() => setDetector(false)}
          />
        </Link>
        <Link to="Account">
          <img
            src={account}
            alt="personalprofile page"
            className="sidebarIcon"
            onMouseOver={() => setDetector("account")}
            onMouseOut={() => setDetector(false)}
          />
        </Link>
      </div>
      <div className="secondRow">
        {detector === "home" && <SideBarPop alt="Home" />}
        {detector === "addPost" && <SideBarPop alt="Add a new post" />}
        {detector === "dms" && <SideBarPop alt="Enter your inbox" />}
        {detector === "account" && <SideBarPop alt="Personal account" />}
      </div>
    </div>
  );
}
