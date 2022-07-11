import React, { useState } from "react";
import AddressAutocomplete from "../../components/AddressAutocomplete/AddressAutocomplete";
import FormInput from "../../components/FormInput/FormInput";
import FileInput from "../../components/FileInput/FileInput";
import FormButton from "../../components/FormButton/FormButton";
import ListOfCheakboxes from "../../components/ListOfCheakboxes/ListOfCheakboxes";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const [previewSource, setPreviewSource] = useState("");
  const [address, setAddress] = useState("");
  const [testTheForm, setTestTheForm] = useState({
    usernameTaken: null,
    emailTaken: null,
    passwordWasEntered: null,
  });
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    profilePic: "",
    emailAddress: "",
    phoneNumber: "",
    address: "",
    certification: {
      ropeAccessTechnician: false,
      heightWorker: false,
      mastClimber: false,
    },
    preferedJobs: {
      windowCleaning: false,
      sealing: false,
      concreteReconstruction: false,
      antiBirdNetsInstalling: false,
      windowRepairs: false,
      welding: false,
      signHanging: false,
    },
  });

  //uploading the profile pic
  function handleFileInputChange(e) {
    const file = e.target.files[0];
    previewFile(file);
  }

  function previewFile(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  }

  //Generate a random password
  function genPassword() {
    var chars =
      "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 12;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }
  //Copy the new password to the clipboard
  function copyPassword() {
    navigator.clipboard.writeText(newUserData.password);
  }

  //we are cheaking if the username already exists in our DB
  //Recieving False means that the username is not registered
  async function testUsername(username) {
    const res = await fetch(`api/testUsername/?username=${username}`);
    const json = await res.json();
    console.log(json);
    return json;
  }

  //we are cheaking if the email already exists in our DB
  //Recieving False means that the email is not registered
  async function testEmailAddress(address) {
    const res = await fetch(`api/testAddress/?address=${address}`);
    const json = await res.json();
    return json;
  }

  //adding a new user to the system, but first cheacking for form errors
  //we need the form to include at least a username, password and email
  async function postNewUser(newUserData, base64EncodedImage, testTheForm) {
    console.log(newUserData);
    const body = JSON.stringify({
      data: base64EncodedImage,
      userData: newUserData,
    });

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    };
    if (
     true
    ) {
      const res = await fetch(`api/users`, requestOptions);
      const json = await res.json();
      console.log(json);
      (await json) ? navigate("/") : console.log("something wrong");
    } else {
      console.log("something has accoured");
      window.scrollTo(0, 0);
    }
  }

  return (
    <React.Fragment>
      <div className="signupPage">
        <h1 className="heading">Sign Up to 8Knot</h1>
        {/* Start of sign up form */}
        <FormInput
          type={"text"}
          label={"First name"}
          onChange={(e) => {
            setNewUserData({ ...newUserData, firstName: e.target.value });
          }}
        />
        <FormInput
          type={"text"}
          label={"Last name"}
          onChange={(e) => {
            setNewUserData({ ...newUserData, lastName: e.target.value });
          }}
        />
        <FormInput
          type="text"
          label={"Username"}
          placeholder={"This field is mandatory"}
          onChange={(e) => {
            setNewUserData({ ...newUserData, userName: e.target.value });
          }}
          onFocus={() => {
            setTestTheForm({ ...testTheForm, usernameTaken: false });
          }}
          onBlur={async (e) => {
            setTestTheForm({
              ...testTheForm,
              usernameTaken: await testUsername(e.target.value),
            });
            // console.log(testTheForm);
          }}
        />
        {testTheForm.usernameTaken && (
          <div>
            The username is already taken. Please choose a different one.
          </div>
        )}
        <FormInput
          type={"password"}
          label={"password"}
          placeholder={"This field is mandatory"}
          value={newUserData.password}
          onChange={(e) => {
            setNewUserData({ ...newUserData, password: e.target.value });
            console.log(newUserData);
          }}
        />
        <div>
          <FormButton
            text={"Generate Password"}
            onClick={() => {
              setNewUserData({ ...newUserData, password: genPassword() });
              setTestTheForm({ ...testTheForm, passwordWasEntered: true });
              console.log(newUserData.password);
            }}
          />
          {newUserData.password && (
            <FormButton text={"Copy password"} onClick={copyPassword()} />
          )}
        </div>
        <FormInput
          type={"text"}
          label={"Email"}
          placeholder={"This field is mandatory"}
          onChange={(e) => {
            setNewUserData({ ...newUserData, emailAddress: e.target.value });
          }}
        />

        <FileInput
          label={"Profile Picture"}
          name={"profilePicture"}
          id={"profilePicture"}
          accept={"image/*"}
          onChange={handleFileInputChange}
        />
        {previewSource && (
          <div>
            <div>Preview:</div>
            <img
              src={previewSource}
              alt="chosen"
              style={{ width: "250px", borderRadius: "50%" }}
            />{" "}
          </div>
        )}

        <FormInput
          type={"text"}
          label={"Phone number"}
          onChange={(e) => {
            setNewUserData({ ...newUserData, phoneNumber: e.target.value });
          }}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "50vw",
            justifyContent: "space-between",
            margin: "16px 0 0 0",
          }}
        >
          <AddressAutocomplete
            label={"Address"}
            address={address}
            setAddress={setAddress}
            postData={newUserData}
            setPostData={setNewUserData}
          />
        </div>
        <ListOfCheakboxes
          label={"Certification"}
          optionsArray={Object.keys(newUserData.certification)}
          state={newUserData}
          stateFunction={setNewUserData}
        />

        <ListOfCheakboxes
          label={"Prefered Jobs"}
          optionsArray={Object.keys(newUserData.preferedJobs)}
          state={newUserData}
          stateFunction={setNewUserData}
        />
        <div className="submitAndresetButtons">
          <FormButton
            type={"submit"}
            text={"Submit"}
            onClick={() => postNewUser(newUserData, previewSource, testTheForm)}
          />
          <FormButton text={"Reset"} onClick={() => window.location.reload()} />
        </div>

        {/* End of sign up form */}
      </div>
    </React.Fragment>
  );
}
