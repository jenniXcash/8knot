import React, { useState, useEffect } from "react";
import "./SignUp.css";
export default function SignUp() {
  const [setlmentList, setSetlmentList] = useState([]);

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
        <form className="signupForm">
          <label htmlFor="firstName">First Name:</label>
          <input type="text" className="signupInputim" />
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" className="signupInputim" />
          <label htmlFor="email">Email address: </label>
          <input type="email" className="signupInputim" />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input type="text" className="signupInputim" />
          {/* <label htmlFor="region">Region:</label> */}
          {/* <select className="signupFormSelect">
            <option> </option>
            <option>--North</option>
            <option value="Golan Height">Golan Height</option>
            <option value="Northern Galilee">Northern Galilee</option>
            <option value="Eastern Galilee">Eastern Galilee</option>
            <option value="Southern Galilee">Southern Galilee</option>
            <option value="Carmel Region">Carmel Region</option>
            <option value="Jordan Valley">Jordan Valley</option>
            <option> </option>
            <option>--Center</option>
            <option value="Hasharon">Hasharon</option>
            <option value="Tel-Aviv metro">Tel-Aviv Metropolitan</option>
            <option value="Shfela">Shfela</option>
            <option value="Jerusalem">Jerusalem</option>
            <option value="Judea and Samaria">Judea and Samaria</option>
            <option> </option>
            <option>--South</option>
            <option value="Southern Coastal Plain">
              Southern Coastal Plain
            </option>
            <option value="Lakhish">Lakhish</option>
            <option value="Northern Negev">Northern Negev</option>
            <option value="Western Negev">Western Negev</option>
            <option value="Southern Negev">Southern Negev</option>
            <option value="Arabah">Arabah</option>
          </select> */}
          <label htmlFor="address">City: </label>
          <select className="signupFormSelect">
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
          />
          <label htmlFor="certificate1">Rope Access Technician</label>
          <input
            type="checkbox"
            id="cerificate2"
            name="certificate2"
            value="Height Worker"
            className="signupFormCheackbox"
          />
          <label htmlFor="certificate2">Height Worker</label>
          <input
            type="checkbox"
            id="certificate3"
            name="certificate3"
            value="Mast Climber"
            className="signupFormCheackbox"
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
          />
          <label htmlFor="preferedJob1">Window Cleaning</label>
          <input
            type="checkbox"
            id="preferdJob2"
            name="preferedJob2"
            value="Sealing"
            className="signupFormCheackbox"
          />
          <label htmlFor="preferedJob2">Sealing</label>
          <input
            type="checkbox"
            id="preferedJob3"
            name="preferedJob3"
            value="Concrete Reconstruction"
            className="signupFormCheackbox"
          />
          <label htmlFor="preferedJob3">Concrete Reconstruction</label>
          <input
            type="checkbox"
            id="preferedJob4"
            name="preferedJob4"
            value="Anti-Bird Nets Installing"
            className="signupFormCheackbox"
          />
          <label htmlFor="preferedJob4">Anti-Bird Nets Installing</label>
          <input
            type="checkbox"
            id="preferedJob5"
            name="preferedJob5"
            value="Window Repairs"
            className="signupFormCheackbox"
          />
          <label htmlFor="preferdJob5">Window Repairs</label>
          <input
            type="checkbox"
            id="preferedJob6"
            name="welding"
            value="welding"
            className="signupFormCheackbox"
          />
          <label htmlFor="preferedJob6">Welding</label>
          <input
            type="checkbox"
            id="preferedJob7"
            name="preferedJob7"
            value="Sign Hanging"
            className="signupFormCheackbox"
          />
          <label htmlFor="preferedJob7">Sign Hanging</label>
          <div></div>
          <div>
            <button className="signupFormButtons">Save</button>
            <button className="signupFormButtons">Reset</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}
