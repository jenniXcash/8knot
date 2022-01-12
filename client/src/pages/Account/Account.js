import React from "react";

import "./Account.css";
import userPic from "../../icons/account.svg";
export default function Account() {
  const fullName = "jenia cash";
  const city = "Azuz";
  const region = "south";
  const professions = ["Window Cleaning", "Painting"];
  return (
    <React.Fragment>
      <div className="container">
        <h2>User Name</h2>
        <img src={userPic} alt="Users Profile Pic" className="profilePic" />
        <button className="changePicButton">Change Picture</button>
        <div className="userDetails">
          <div className="name">
            <span className="bold">Name: </span>
            {fullName}
          </div>
          <div className="city">
            <span className="bold">City: </span>
            {city}
          </div>
          <div className="region">
            <span className="bold">Region: </span>
            {region}
          </div>
          <div className="professions">
            <span className="bold">Professions: </span>
            {professions.map((e) => (
              <span key={e}>{e}/ </span>
            ))}
          </div>
        </div>
        <div className="changeDetails">
          <button className="changeDetailsButton">Change Details</button>
        </div>
      </div>
    </React.Fragment>
  );
}
