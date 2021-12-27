import React from "react";
import "./EnlargeThumbnail.css";

export default function EnlargeThumbnail({ imageSrc, setImageHover, post }) {
  return (
    <React.Fragment>
      <div className="realSizedImage">
        <div className="close" onClick={() => setImageHover(false)}>
          X
        </div>
        <div className="secondRowInEnlargedThumbnail">
          <div className="info">
            <div className="userName">{post.userName}</div>
            <div className="infoConnectors">IS</div>
            <div className="description">{post.description}</div>
          </div>
          <img
            src={imageSrc}
            alt="realSizeImage"
            className="rSI"
            onClick={() => setImageHover(false)}
          />
        </div>
      </div>
    </React.Fragment>
  );
}
