import React from "react";
import "./FormInput.css";

export default function FormInput(props) {
  return (
    <div className="FormInput">
      <label htmlFor={props.label}>{props.label}:</label>
      <input
        type={props.type}
        className="textField"
        placeholder={props.placeholder}
      />
    </div>
  );
}
