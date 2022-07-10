import React from "react";
import "./FormInput.css";

export default function FormInput(props) {
  return (
    <div className="formInputGrid">
      <label htmlFor={props.label}>{props.label}:</label>
      <input
        type={props.type}
        className="textField"
        placeholder={props.placeholder}
        style={props.style}
        value={props.value}
        onChange={props.onChange}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
      />
    </div>
  );
}
