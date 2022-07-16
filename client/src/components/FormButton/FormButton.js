import React from "react";
import "./FormButton.css";

export default function FormButton({
  type,
  onChange,
  onFocus,
  onBlur,
  text,
  onClick,
  style,
}) {
  return (
    <React.Fragment>
      <button
        type={type}
        style={style}
        className="formButton"
        onClick={onClick}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      >
        {text}
      </button>
    </React.Fragment>
  );
}
