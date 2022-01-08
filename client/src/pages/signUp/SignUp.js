import React from "react";
import "./SignUp.css";
export default function SignUp() {
  return (
    <React.Fragment>
      <div className="signupPage">
        <h1 className="heading">Sign Up to 8Knot</h1>
        <form className="signupForm">
          <label for="firstName">First Name:</label>
          <input type="text" className="signupInputim" />
          <label for="lastName">Last Name:</label>
          <input type="text" className="signupInputim" />
          <label for="email">Email address: </label>
          <input type="email" className="signupInputim" />
          <label for="phoneNumber">Phone Number:</label>
          <input type="text" className="signupInputim" />
        </form>
      </div>
    </React.Fragment>
  );
}
