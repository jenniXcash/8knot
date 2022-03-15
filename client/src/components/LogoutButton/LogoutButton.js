import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./LogoutButton.css";

export default function LogoutButton() {
  const { logout } = useAuth0();
  return (
    <React.Fragment>
      <button
        className="loginLogoutButtons"
        onClick={() => logout({ returnTo: window.location.origin })}
      >
        Logout
      </button>
    </React.Fragment>
  );
}
