import React from "react";
import "./FormInput.css";

export default function FormInput(props) {
  const {
    label, // Holds the <Label> of the input
    labelstyle, //Uses for specific styling of the label
    type, //Input field type
    placeholder,
    inputstyle, //Used for specific styling of the input field itself
    value, //Value of the input
    onChange,
    onFocus,
    onBlur,
    errorMessage,
    pattern,
    required,
  } = props;
  // const arr = Object.keys(props);
  // arr.forEach((e) => {
  //   console.log(`${e}: ${props[e]}`);
  // });
  return (
    <React.Fragment>
      <div className="formInputFlex">
        {label && (
          <label htmlFor={label} labelstyle={labelstyle}>
            {label}:
          </label>
        )}
        <input
          type={type}
          className="textField"
          placeholder={placeholder}
          inputstyle={inputstyle}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          pattern={pattern}
          required={required}
        />
      </div>
    </React.Fragment>
  );
}
