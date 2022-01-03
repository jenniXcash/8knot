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
  const imageKeys = Object.keys(images);
  return (
    <React.Fragment>
      <Link to={`PostPage/${id}`}>
        <div className="post">
          <div className="postHeader">
            <div>
              By:
              <span className="thin">{userName}</span>
            </div>
            <div className="dateAndTime">
              <div>
                {date} <span className="thin time">{time}</span>
              </div>
            </div>
          </div>
          <div>
            Address:
            <span className="thin"> {address}</span>
          </div>
          <br />
          <div>
            Type of work:
            <span className="thin"> {typeOfWork}</span>
          </div>
          <br />
          <div>
            What we gonna do:
            <span className="thin"> {description}</span>
          </div>
          <br />
          <div className="thumbnailsInPost">
            {imageKeys.map((src) => (
              <img
                src={images[src]}
                alt="thumbnail"
                className="thumbnail"
                key={images[src]}
              />
            ))}
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}
