import React from "react";
import "./FileInput.css";

export default function FileInput(props) {
  return (
    <React.Fragment>
      <div className="fileInputFlex">
        {props.label && (
          <label htmlFor={props.label} className="label">
            {props.label}:
          </label>
        )}
        <input
          type="file"
          name={props.name}
          id={props.id}
          style={props.style}
          accept={props.accept}
          onChange={props.onChange}
        />
      </div>
    </React.Fragment>
  );
}
