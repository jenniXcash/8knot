import React from "react";
import { useEffect, useContext } from "react";

import SearchPostsContext from "../../context/SearchPostsContext";
import FeedItem from "../../components/FeedItem/FeedItem";
import CircularProgress from "@mui/material/CircularProgress";
import "./Home.css";

function Home() {
  const { posts, getPosts, search } = useContext(SearchPostsContext);

  // useEffect(() => {
  //   getPosts(search);
  // }, [search, getPosts]);

  return (
    <React.Fragment>
      <div className="mainFrame">
        <div className="feedItems">
          {!posts && <CircularProgress />}
          {posts &&
            posts.map(
              ({
                userName,
                date,
                time,
                address,
                typeOfWork,
                description,
                images,
                _id,
                method,
                userSub,
              }) => (
                <FeedItem
                  key={_id}
                  id={_id}
                  userName={userName}
                  date={date}
                  time={time}
                  address={address}
                  typeOfWork={typeOfWork}
                  description={description}
                  images={images}
                  method={method}
                  recieversSub={userSub}
                />
              )
            )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
