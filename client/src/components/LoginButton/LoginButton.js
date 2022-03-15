import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LoginButton.css";

export default function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <React.Fragment>
      <button
        className="loginLogoutButtons"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </button>
    </React.Fragment>
  );
}
