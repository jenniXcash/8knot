import React, { useState, useEffect } from "react";
import "./SignUp.css";
export default function SignUp() {
  const [setlmentList, setSetlmentList] = useState([]);

  let newUserData = {
    firstName: "",
    lastName: "",
    dateOfCreation: "",
    gender: "",
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
  };
  const testUser = {
    firstName: "hadasashvili",
    lastName: "michalevich",
    dateOfCreation: "12/12/12",
    gender: "male",
    emailAddress: "mals",
    phoneNumber: "mals",
    city: "אבו-גוש",
    certification: { 1: "true" },
    preferedJobs: { 1: "true" },
  };
  //adding a new user to the system
  function postNewUser(newUserData) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUserData),
    };

    const res = fetch(`api/users`, requestOptions);
    res
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  }

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
  return (
    <React.Fragment>
      <div className="signupPage">
        <h1 className="heading">Sign Up to 8Knot</h1>
        {/* start of Signup form */}
        <form className="signupForm">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              newUserData.firstName = e.target.value;
              console.log(newUserData);
            }}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              newUserData.lastName = e.target.value;
              console.log(newUserData);
            }}
          />
          <label htmlFor="email">Email address: </label>
          <input
            type="email"
            className="signupInputim"
            onChange={(e) => {
              newUserData.emailAddress = e.target.value;
              console.log(newUserData);
            }}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            className="signupInputim"
            onChange={(e) => {
              newUserData.phoneNumber = e.target.value;
              console.log(newUserData);
            }}
          />
          <label htmlFor="address">City: </label>
          <select
            className="signupFormSelect"
            onChange={(e) => {
              newUserData.city = e.target.value;
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
              newUserData.certification.ropeAccessTechnician = e.target.checked;
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
              newUserData.certification.heightWorker = e.target.checked;
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
              newUserData.certification.mastClimber = e.target.checked;
              console.log(newUserData);
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
              newUserData.preferedJobs.windowCleaning = e.target.checked;
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
              newUserData.preferedJobs.sealing = e.target.checked;
              console.log(newUserData);
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
              newUserData.preferedJobs.concreteReconstruction =
                e.target.checked;
              console.log(newUserData);
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
              newUserData.preferedJobs.antiBirdNetsInstalling =
                e.target.checked;
              console.log(newUserData);
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
              newUserData.preferedJobs.windowRepairs = e.target.checked;
              console.log(newUserData);
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
              newUserData.preferedJobs.welding = e.target.checked;
              console.log(newUserData);
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
              newUserData.preferedJobs.signHanging = e.target.checked;
              console.log(newUserData);
            }}
          />
          <label htmlFor="preferedJob7">Sign Hanging</label>
          <div></div>
          <div>
            <button
              className="signupFormButtons"
              onClick={() => postNewUser(newUserData)}
            >
              Save
            </button>
            <button className="signupFormButtons">Reset</button>
          </div>
        </form>
        {/* End of signup form */}
      </div>
    </React.Fragment>
  );
}
