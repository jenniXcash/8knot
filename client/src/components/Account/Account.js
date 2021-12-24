import React from "react";

import "./Account.css";
import userPic from "../../icons/account.svg";
export default function Account() {
  return (
    <React.Fragment>
      <div className="container">
        <h2>User Name</h2>
        <img src={userPic} alt="Users Profile Pic" className="profilePic" />
        <button className="changePicButton">Change Picture</button>
      </div>
    </React.Fragment>
  );
}
