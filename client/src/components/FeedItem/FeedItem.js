import React from "react";
import "./FeedItem.css";
export default function FeedItem({
  userName,
  date,
  time,
  address,
  typeOfWork,
  description,
  images,
}) {
  return (
    <React.Fragment>
      <div className="post">
        <div className="postHeader">
          <div>
            <span className="bolding">By: </span>
            {userName}
          </div>
          <div className="dateAndTime">
            <div>{date}</div>
            <div>{time}</div>
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
      </div>
    </React.Fragment>
  );
}
