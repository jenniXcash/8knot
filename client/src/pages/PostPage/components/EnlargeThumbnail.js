import React from "react";
import "./EnlargeThumbnail.css";

export default function EnlargeThumbnail({ imageSrc, setImageHover }) {
  return (
    <React.Fragment>
      <div className="realSizedImage">
        <div className="close" onClick={() => setImageHover(false)}>
          X
        </div>
        <img
          src={imageSrc}
          alt="realSizeImage"
          className="rSI"
          onClick={() => setImageHover(false)}
        />
      </div>
    </React.Fragment>
  );
}
