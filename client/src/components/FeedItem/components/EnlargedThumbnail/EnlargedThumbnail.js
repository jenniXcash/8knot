import React from "react";
import "./EnlargedThumbnail.css";

export default function EnlargedThumbnail({ image }) {
  return (
    <React.Fragment>
      <div className="wrapper">
        <div>
          <img src={image} alt="pic" className="popy" />
        </div>
      </div>
    </React.Fragment>
  );
}
