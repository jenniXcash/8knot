import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormButton from "../../components/FormButton/FormButton";
import FormInput from "../../components/FormInput/FormInput";
import "./LoginPage.css";

export default function LoginPage() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
  });
  const [resError, setResError] = useState();

  async function loginUser(user) {
    const body = JSON.stringify({
      username: user.username,
      unhashedPassword: user.password,
    });
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };
    const res = await fetch(`logAndAuth/login`, requestOptions);
    const json = await res.json();
    setResError(json.response);
    if (!resError) navigate(0);
  }

  return (
    <React.Fragment>
      <div className="lpContainer">
        <FormInput
          type="text"
          placeholder={"Username"}
          label={"Username"}
          onChange={(e) => {
            setUserDetails({ ...userDetails, username: e.target.value });
          }}
        />
        <FormInput
          type="password"
          placeholder={"password"}
          label={"Password"}
          onChange={(e) => {
            setUserDetails({ ...userDetails, password: e.target.value });
          }}
        />
        {resError && <p style={{ color: "red" }}>{resError}</p>}
        <FormButton
          type={"submit"}
          text={"Submit"}
          style={{ margin: "30px 0 0 0" }}
          onClick={() => loginUser(userDetails)}
        />
      </div>
    </React.Fragment>
  );
}
