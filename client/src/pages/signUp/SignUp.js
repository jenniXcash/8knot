import React, { useState, useRef } from "react";
import AddressAutocomplete from "../../components/AddressAutocomplete/AddressAutocomplete";
import FormInput from "../../components/FormInput/FormInput";
import { useNavigate } from "react-router-dom";
import "./SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const passwordRef = useRef(null);
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
    passwordRef.current.value = password;
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
      !testTheForm.usernameTaken &&
      !testTheForm.emailTaken &&
      testTheForm.passwordWasEntered
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
        {/* {formError && (
          <div>
            One or more of the mandatory fields was not filled.{" "}
            <span className="errorMsg">
              {" "}
              Please make sure you chose a username, a password and provided an
              email address.
            </span>
          </div>
        )} */}
        {/* start of Signup form */}
        <div className="signupForm">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              setNewUserData({ ...newUserData, firstName: e.target.value });
            }}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              setNewUserData({ ...newUserData, lastName: e.target.value });
            }}
          />
          <label htmlFor="userName">*Username:</label>
          <input
            type="text"
            className="signupInputim"
            placeholder="This field is mandatory"
            onChange={(e) => {
              setNewUserData({ ...newUserData, username: e.target.value });
            }}
            onFocus={() => {
              setTestTheForm({ ...testTheForm, usernameTaken: false });
            }}
            onBlur={async (e) => {
              setTestTheForm({
                ...testTheForm,
                usernameTaken: await testUsername(e.target.value),
              });
              console.log(testTheForm);
            }}
          />

          {testTheForm.usernameTaken && (
            <div className="errorMsg"> The Username is already taken.</div>
          )}
          {testTheForm.usernameTaken && <div></div>}
          <label htmlFor="lastName">*Password:</label>
          <input
            type="password"
            className="signupInputim"
            placeholder="This field is mandatory"
            ref={passwordRef}
            onChange={(e) => {
              setNewUserData({ ...newUserData, password: e.target.value });
              setTestTheForm({ ...testTheForm, passwordWasEntered: true });
              console.log(newUserData.password);
            }}
          />
          <div></div>
          <div>
            <button
              className="passwordButtons"
              onClick={() => {
                setNewUserData({ ...newUserData, password: genPassword() });
                setTestTheForm({ ...testTheForm, passwordWasEntered: true });
                console.log(newUserData.password);
              }}
            >
              Generate password
            </button>
            <div>
              {newUserData.password && (
                <button className="passwordButtons" onClick={copyPassword}>
                  Copy
                </button>
              )}
            </div>
          </div>
          <label htmlFor="email">*Email address: </label>
          <input
            type="email"
            className="signupInputim"
            placeholder="This field is mandatory"
            onChange={(e) => {
              setNewUserData({ ...newUserData, emailAddress: e.target.value });
            }}
            onFocus={() => {
              setTestTheForm({ ...testTheForm, emailTaken: false });
            }}
            onBlur={async (e) => {
              setTestTheForm({
                ...testTheForm,
                emailTaken: await testEmailAddress(e.target.value),
              });
              console.log(testTheForm);
            }}
          />
          {testTheForm.emailTaken && (
            <div className="errorMsg">
              {" "}
              The Email address is already in registered.{" "}
            </div>
          )}
          {testTheForm.emailTaken && <div></div>}
          <label htmlFor="addProfilePic">Add profile picture: </label>
          <input
            type="file"
            name="profilePicture"
            id="profilePicture"
            accept="image/*"
            onChange={handleFileInputChange}
          />
          {previewSource && <div>Preview: </div>}
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen"
              style={{ width: "250px", borderRadius: "50%" }}
            />
          )}
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              setNewUserData({ ...newUserData, phoneNumber: e.target.value });
            }}
          />
          <label htmlFor="address">Addres: </label>
          <AddressAutocomplete
            address={address}
            setAddress={setAddress}
            postData={newUserData}
            setPostData={setNewUserData}
          />
          <div className="signupFormSpacer"></div>
          <div className="signupFormSpacer"></div>

          <label htmlFor="certification">Certification:</label>
          <div></div>
          <input
            type="checkbox"
            id="certtificate1"
            name="certificate1"
            value="Rope Access Technician"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                certification: {
                  ...newUserData.certification,
                  ropeAccessTechnician: e.target.checked,
                },
              });
              console.log(newUserData);
            }}
          />
          <label htmlFor="certificate1">Rope Access Technician</label>
          <input
            type="checkbox"
            id="cerificate2"
            name="certificate2"
            value="Height Worker"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                certification: {
                  ...newUserData.certification,
                  heightWorker: e.target.checked,
                },
              });
              console.log(newUserData);
            }}
          />
          <label htmlFor="certificate2">Height Worker</label>
          <input
            type="checkbox"
            id="certificate3"
            name="certificate3"
            value="Mast Climber"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                certification: {
                  ...newUserData.certification,
                  mastClimber: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="certificate3">Mast Climber</label>

          <div className="signupFormSpacer"></div>
          <div className="signupFormSpacer"></div>

          <label htmlFor="prefered jobs">Prefered Jobs:</label>
          <div></div>
          <input
            type="checkbox"
            id="preferedJob1"
            name="preferedJob1"
            value="Window Cleaning"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                preferedJobs: {
                  ...newUserData.preferedJobs,
                  windowCleaning: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="preferedJob1">Window Cleaning</label>
          <input
            type="checkbox"
            id="preferdJob2"
            name="preferedJob2"
            value="Sealing"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                preferedJobs: {
                  ...newUserData.preferedJobs,
                  sealing: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="preferedJob2">Sealing</label>
          <input
            type="checkbox"
            id="preferedJob3"
            name="preferedJob3"
            value="Concrete Reconstruction"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                preferedJobs: {
                  ...newUserData.preferedJobs,
                  concreteReconstruction: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="preferedJob3">Concrete Reconstruction</label>
          <input
            type="checkbox"
            id="preferedJob4"
            name="preferedJob4"
            value="Anti-Bird Nets Installing"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                preferedJobs: {
                  ...newUserData.preferedJobs,
                  antiBirdNetsInstalling: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="preferedJob4">Anti-Bird Nets Installing</label>
          <input
            type="checkbox"
            id="preferedJob5"
            name="preferedJob5"
            value="Window Repairs"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                preferedJobs: {
                  ...newUserData.preferedJobs,
                  windowRepairs: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="preferdJob5">Window Repairs</label>
          <input
            type="checkbox"
            id="preferedJob6"
            name="welding"
            value="welding"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                preferedJobs: {
                  ...newUserData.preferedJobs,
                  welding: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="preferedJob6">Welding</label>
          <input
            type="checkbox"
            id="preferedJob7"
            name="preferedJob7"
            value="Sign Hanging"
            className="signupFormCheackbox"
            onChange={(e) => {
              setNewUserData({
                ...newUserData,
                preferedJobs: {
                  ...newUserData.preferedJobs,
                  signHanging: e.target.checked,
                },
              });
            }}
          />
          <label htmlFor="preferedJob7">Sign Hanging</label>

          <button
            type="submit"
            className="signupFormButtons"
            onClick={() => {
              postNewUser(newUserData, previewSource, testTheForm);
            }}
          >
            Save
          </button>
          <button
            className="signupFormButtons"
            onClick={() => window.location.reload()}
          >
            Reset
          </button>
        </div>
        {/* End of signup form */}
      </div>
    </React.Fragment>
  );
}
