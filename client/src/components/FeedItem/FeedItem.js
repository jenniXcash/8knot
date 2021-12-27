import React from "react";
import { v4 as uuidv4 } from "uuid";
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
          <br />
          <div>
            <span className="bolding">Type of work: </span>
            {typeOfWork}
          </div>{" "}
          <br />
          <div>
            <span className="bolding">What we gonna do: </span>
            {description}
          </div>{" "}
          <br />
          <div className="thumbnailsInPost">
            {imageKeys.map((src) => (
              <img
                src={images[src]}
                alt="fuck shit up"
                className="fsu"
                key={uuidv4()}
              />
            ))}
          </div>
        </div>
      </Link>
    </React.Fragment>
  );
}
