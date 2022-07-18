import React from "react";
import FormButton from "../../components/FormButton/FormButton";
import FormInput from "../../components/FormInput/FormInput";
import "./LoginPage.css";

export default function LoginPage() {
  async function loginUser() {
    console.log("trying to login");
    const res = await fetch(`logAndAuth/all`);
    const json = await res.json();
    console.log(json);
  }

  return (
    <React.Fragment>
      <div className="lpContainer">
        <FormInput type="text" placeholder={"Username"} label={"Username"} />
        <FormInput
          type="password"
          placeholder={"password"}
          label={"Password"}
        />
        <FormButton
          type={"submit"}
          text={"Submit"}
          style={{ margin: "30px 0 0 0" }}
          onClick={loginUser}
        />
      </div>
    </React.Fragment>
  );
}
