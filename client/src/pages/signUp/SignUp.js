import React, { useState, useEffect } from "react";
import "./SignUp.css";
export default function SignUp() {
  const [setlmentList, setSetlmentList] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [newUserData, setNewUserData] = useState({
    firstName: "",
    lastName: "",
    profilePic: "",
    emailAddress: "",
    phoneNumber: "",
    city: "",
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
  //fetching a list of settlments from a .gov API
  useEffect(() => {
    const res = fetch(
      "https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=9000"
    );
    res
      .then((response) => {
        return response.json();
      })
      .then((names) => {
        setSetlmentList(names.result.records);
      });
  }, []);

  //mapping a new array so we would get it filtered of unwanted objects and sorted alphabetacly
  const yeshuvimNames = setlmentList
    .map((e) => {
      return e.שם_ישוב;
    })
    .filter((e) => e !== "לא רשום ")
    .sort();

  //adding a new user to the system
  async function postNewUser(newUserData, base64EncodedImage) {
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
  }

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

  // function handleSubmitFile(e) {
  //   e.preventDefault();
  //   if (!previewSource) return;
  //   uploadImage(previewSource);
  //   postNewUser(newUserData);
  // }

  // async function uploadImage(base64EncodedImage) {
  //   try {
  //     const requestOptions = {
  //       method: "POST",
  //       body: JSON.stringify({ data: base64EncodedImage }),
  //       headers: { "Content-Type": "application/json" },
  //     };
  //     await fetch("api/upload", requestOptions);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  return (
    <React.Fragment>
      <div className="signupPage">
        <h1 className="heading">Sign Up to 8Knot</h1>
        {/* start of Signup form */}
        <div
          className="signupForm"
          // onSubmit={handleSubmitFile}
          // action="/NewUserAdded"
        >
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              setNewUserData({ ...newUserData, firstName: e.target.value });
              console.log(newUserData);
            }}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              setNewUserData({ ...newUserData, lastName: e.target.value });
              console.log(newUserData);
            }}
          />
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
          <label htmlFor="email">Email address: </label>
          <input
            type="email"
            className="signupInputim"
            onChange={(e) => {
              setNewUserData({ ...newUserData, emailAddress: e.target.value });
              console.log(newUserData);
            }}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              setNewUserData({ ...newUserData, phoneNumber: e.target.value });
              console.log(newUserData);
            }}
          />
          <label htmlFor="address">City: </label>
          <select
            className="signupFormSelect"
            onChange={(e) => {
              setNewUserData({ ...newUserData, city: e.target.value });
              console.log(newUserData);
            }}
          >
            <option>Choose setlment</option>
            {yeshuvimNames.map((yeshuv) => {
              return (
                <option value={yeshuv} key={yeshuv}>
                  {yeshuv}
                </option>
              );
            })}
          </select>

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
                preferedJobs: {
                  ...newUserData.certification,
                  ropeAccessTechnician: e.target.checked,
                },
              });
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
                preferedJobs: {
                  ...newUserData.certification,
                  heightWorker: e.target.checked,
                },
              });
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
                preferedJobs: {
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
              console.log(newUserData);
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
          <div></div>
          <div>
            <button
              type="submit"
              className="signupFormButtons"
              onClick={() => {
                postNewUser(newUserData, previewSource);
              }}
            >
              Save
            </button>
            <button className="signupFormButtons">Reset</button>
          </div>
        </div>
        {/* End of signup form */}
      </div>
    </React.Fragment>
  );
}
