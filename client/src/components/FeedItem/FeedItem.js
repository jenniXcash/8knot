import React from "react";
import { Link } from "react-router-dom";
import "./FeedItem.css";

export default function FeedItem({
  userName,
  date,
  time,
  address,
  typeOfWork,
  description,
  images,
  id,
}) {
  return (
    <React.Fragment>
      <Link to={`PostPage/${id}`}>
        <div className="post">
          <div className="postHeader">
            <div>
              <span className="bolding">By: </span>
              {userName}
            </div>
            <div className="dateAndTime">
              <div>
                {date} {time}
              </div>
            </div>
          </div>

          <div>
            <span className="bolding">Address: </span>
            {address}
          </div>
          <div>
            <span className="bolding">Type of work: </span>
            {typeOfWork}
          </div>
          <div>
            <span className="bolding">What we gonna do: </span>
            {description}
          </div>
          <div className="thumbnailsInPost">
            <img src={images.image1} alt="fuck shit up" className="fsu" />
            <img src={images.image2} alt="fuck shit up" className="fsu" />
            <img src={images.image3} alt="fuck shit up" className="fsu" />
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}
