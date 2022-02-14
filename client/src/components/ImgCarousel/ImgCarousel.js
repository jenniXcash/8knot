import React, { useState } from "react";
import "./ImgCarousel.css";
export default function ImgCarousel({ imgURLS, currentImage }) {
  const imgArray = Object.keys(imgURLS).map((key) => {
    return imgURLS[key].url;
  });
  const [currentIndexOfImg, setCurrentIndexOfImg] = useState(
    imgArray.indexOf(currentImage)
  );
  //flipping forward by reRendering the image by changing the state
  const nextImage = () => {
    setCurrentIndexOfImg(currentIndexOfImg + 1);
  };
  //flipping backward by reRendering the image by changing the state
  const prevImage = () => {
    setCurrentIndexOfImg(currentIndexOfImg - 1);
  };
  return (
    <React.Fragment>
      <div className="nextAndPrev">
        <div>
          {currentIndexOfImg < imgArray.length - 1 && (
            <div className="nextImg" onClick={nextImage}></div>
          )}
        </div>
        <div>
          {currentIndexOfImg > 0 && (
            <div className="prevImg" onClick={prevImage}></div>
          )}
        </div>
      </div>

      <img
        src={imgArray[currentIndexOfImg]}
        alt="img"
        className="currentImage"
      />
    </React.Fragment>
  );
}
