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
    <div className="container">
      <div className="sideBar">
        <div className="iconAndDescFlex">
          <Link to="PostNew">
            <img
              src={plus}
              alt="Add a new post"
              onMouseOver={() => setDetector("addPost")}
              onMouseOut={() => setDetector(false)}
            />
          </Link>{" "}
          {detector === "addPost" && <SideBarPop alt="Add a new post" />}
        </div>
        <div className="iconAndDescFlex">
          <Link to="Dms">
            <img
              src={dms}
              alt="Inbox"
              onMouseOver={() => setDetector("dms")}
              onMouseOut={() => setDetector(false)}
            />
          </Link>

          {detector === "dms" && <SideBarPop alt="Enter your inbox" />}
        </div>
        <div className="iconAndDescFlex">
          <Link to="/">
            <img
              src={home}
              alt="home screen"
              onMouseOver={() => setDetector("home")}
              onMouseOut={() => setDetector(false)}
            />
          </Link>

          {detector === "home" && <SideBarPop alt="Home" />}
        </div>
        <div className="iconAndDescFlex">
          <Link to="Account">
            <img
              src={account}
              alt="personalprofile page"
              onMouseOver={() => setDetector("account")}
              onMouseOut={() => setDetector(false)}
            />
          </Link>

          {detector === "account" && <SideBarPop alt="Personal account" />}
        </div>
      </div>
    </div>
  );
}
