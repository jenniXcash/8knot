import React from "react";
import FormButton from "../../components/FormButton/FormButton";
import FormInput from "../../components/FormInput/FormInput";
import "./LoginPage.css";

export default function LoginPage() {
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
        />
      </div>
    </React.Fragment>
  );
}
