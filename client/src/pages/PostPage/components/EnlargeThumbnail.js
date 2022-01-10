import React from "react";
import "./EnlargeThumbnail.css";
import ImgCarousel from "./ImgCarousel/ImgCarousel";
export default function EnlargeThumbnail({ imageSrc, setImageHover, post }) {
  return (
    <React.Fragment>
      <div className="realSizedImage">
        <div className="close" onClick={() => setImageHover(false)}>
          Close
        </div>
        <div className="secondRowInEnlargedThumbnail">
          <div className="info">
            <div className="userName">{post.userName}</div>
            <div className="infoConnectors">IS</div>
            <div className="description">{post.description}</div>
          </div>
          <ImgCarousel imgURLS={post.images} currentImage={imageSrc} />
        </div>
      </div>
    </React.Fragment>
  );
}
