import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./RegistrationError.css";

export default function RegistrationError({ page }) {
  const { loginWithRedirect } = useAuth0();
  return (
    <React.Fragment>
      Sorry, but you have to
      <button
        className="loginButtonForRegistrationError"
        onClick={() => loginWithRedirect()}
      >
        Login
      </button>
      In order to {page}
    </React.Fragment>
  );
}
