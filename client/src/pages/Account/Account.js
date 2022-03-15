import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RegistrationError from "../../components/RegistrationError/RegistrationError";
import "./Account.css";

export default function Account() {
  const { user, isAuthenticated } = useAuth0();

  return (
    <React.Fragment>
      {!isAuthenticated && <RegistrationError page={"view messages"} />}
      {isAuthenticated && (
        <div className="container">
          <h2>{user.name}</h2>
          <img
            src={user.picture}
            alt="Users Profile Pic"
            className="profilePic"
          />
          <button className="changePicButton">Change Picture</button>
          <div className="userDetails">
            <div className="name">
              <span className="bold">Name: {user.name}</span>
            </div>
            <div className="city">
              <span className="bold">City: </span>
            </div>

            <div className="professions">
              <span className="bold">Professions: </span>
            </div>
          </div>
          <div className="changeDetails">
            <button className="changeDetailsButton">Change Details</button>
          </div>
        </div>
      )}
    </React.Fragment>
  );
}
