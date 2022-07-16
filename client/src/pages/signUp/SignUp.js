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

  //we are cheaking if the username already exists and if it is constructed properly
  //True means that we can use the username
  async function testUsername(username) {
    const testObj = { unique: null, regexPatternCompare: null };
    const pattern = "^[A-Za-z0-9]{3,16}$";

    const res = await fetch(`api/testUsername/?username=${username}`);
    testObj.unique = await res.json();

    testObj.regexPatternCompare = username.match(pattern);

    if (testObj.unique && testObj.regexPatternCompare) {
      return true;
    } else {
      return false;
    }
  }

  //we are cheaking if the email already exists in our DB
  //Recieving True means that the email is not registered
  async function testEmailAddress(address) {
    const testObj = { unique: null, regexPatternCompare: null };
    // const pattern = "^w+([.-]?w+)*@w+([.-]?w+)*(.w{2,3})+$";

    const res = await fetch(`api/testAddress/?address=${address}`);
    testObj.unique = await res.json();

    testObj.regexPatternCompare = address.slice("").includes("@", 1);

    if (testObj.unique && testObj.regexPatternCompare) {
      return true;
    } else {
      return false;
    }
  }

  function validateForm(form) {
    console.log(form.usernameTaken, form.passwordWasEntered, form.emailTaken);
    if (form.usernameTaken && form.passwordWasEntered && form.emailTaken) {
      return true;
    } else {
      return false;
    }
  }
  //adding a new user to the system, but first cheacking for form errors
  //we need the form to include at least a username, password and email
  async function postNewUser(newUserData, base64EncodedImage, testTheForm) {
    if (validateForm(testTheForm)) {
      const body = JSON.stringify({
        data: base64EncodedImage,
        userData: newUserData,
      });

      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body,
      };

      const res = await fetch(`api/users`, requestOptions);
      const json = await res.json();
      console.log(json);
      (await json) ? navigate("/") : console.log("something wrong");

      window.scrollTo(0, 0);
    } else {
      console.log("error");
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
            setNewUserData({ ...newUserData, username: e.target.value });
          }}
          onFocus={() => {
            setTestTheForm({ ...testTheForm, usernameTaken: null });
          }}
          onBlur={async (e) => {
            setTestTheForm({
              ...testTheForm,
              usernameTaken: await testUsername(e.target.value),
            });
          }}
        />
        {!testTheForm.usernameTaken && testTheForm.usernameTaken !== null && (
          <div>The username is already taken</div>
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
            }}
          />
          {newUserData.password && (
            <FormButton text={"Copy password"} onClick={copyPassword()} />
          )}
        </div>
        <FormInput
          type={"email"}
          label={"Email"}
          placeholder={"This field is mandatory"}
          onChange={(e) => {
            setNewUserData({ ...newUserData, emailAddress: e.target.value });
          }}
          onFocus={() => {
            setTestTheForm({ ...testTheForm, emailTaken: null });
          }}
          onBlur={async (e) => {
            setTestTheForm({
              ...testTheForm,
              emailTaken: await testEmailAddress(e.target.value),
            });
          }}
        />
        {!testTheForm.emailTaken && testTheForm.emailTaken !== null && (
          <div>This Email addres is already taken</div>
        )}
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
            />
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
