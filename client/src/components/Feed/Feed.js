import React from "react";
import { useEffect, useState } from "react";
import FeedItem from "../FeedItem/FeedItem";
import "./Feed.css";
export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const res = fetch("/api/posts");
    res
      .then(function (response) {
        return response.json();
      })
      .then(function (posts) {
        setPosts(posts);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="feedContainer">
        <div className="feedItems">
          {posts.map(
            ({
              userName,
              date,
              time,
              address,
              typeOfWork,
              description,
              images,
              id,
            }) => (
              <FeedItem
                key={id}
                id={id}
                userName={userName}
                date={date}
                time={time}
                address={address}
                typeOfWork={typeOfWork}
                description={description}
                images={images}
              />
            )
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
