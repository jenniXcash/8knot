import React from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

export default function Greeting() {
  const username = useContext(UserContext);
  return (
    <React.Fragment>
      <p>Hello, {username}</p>
    </React.Fragment>
  );
}
