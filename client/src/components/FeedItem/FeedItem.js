import React from "react";
import { Link } from "react-router-dom";
import FeedItemTooltip from "../FeedItemTooltip/FeedItemTooltip";
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
  const imageKeys = Object.keys(images).map((key) => {
    return images[key];
  });
  return (
    <React.Fragment>
      <div className="post">
        <Link to={`PostPage/${id}`}>
          <div className="postGrid">
            <div>
              <div className="bolder">{userName}</div>
              <div>
                {date}
                {time}
              </div>
            </div>

            <div></div>
            <div className="bolder">Type Of Work: </div>
            <div>{typeOfWork}</div>
            <div className="bolder">Description:</div>
            <div>{description}</div>
            <div className="bolder">Address: </div>
            <div>{address}</div>
            <div></div>
            <div className="attachedImagesToPost">
              {imageKeys.map((image) => {
                return (
                  <img
                    src={image}
                    key={image}
                    alt="pic which is attached to the post"
                    className="attachedImg"
                  />
                );
              })}
            </div>
          </div>
        </Link>
        <FeedItemTooltip userName={userName} />
      </div>
    </React.Fragment>
  );
}
