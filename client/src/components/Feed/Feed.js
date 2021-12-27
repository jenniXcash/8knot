import React from "react";
import { useEffect, useState } from "react";
import FeedItem from "../FeedItem/FeedItem";
import "./Feed.css";
export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const res = fetch("/api/posts");
    setLoading(true);
    res
      .then(function (response) {
        return response.json();
      })
      .then(function (posts) {
        setPosts(posts);
        setLoading(false);
      });
  }, []);
  return (
    <React.Fragment>
      <div className="feedItems">
        {loading && <div className="loading">Loading</div>}
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
    </React.Fragment>
  );
}
