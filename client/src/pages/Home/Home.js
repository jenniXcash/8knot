import React, { useContext } from "react";
// import { useState, useEffect } from "react";
import SearchPostsContext from "../../context/SearchPostsContext";
import FeedItem from "../../components/FeedItem/FeedItem";
import CircularProgress from "@mui/material/CircularProgress";
import "./Home.css";

function Home() {
  const { posts } = useContext(SearchPostsContext);
  // const [posts, setPosts] = useState([]);
  // const [loading, setLoading] = useState(false);

  // function getPosts(term) {
  //   const res = fetch(`api/posts/?term=${term}`);
  //   setLoading(true);
  //   res
  //     .then(function (response) {
  //       return response.json();
  //     })
  //     .then(function (posts) {
  //       setPosts(posts);
  //       setLoading(false);
  //     });
  // }
  // useEffect(() => {
  //   getPosts(search);
  //   console.log("used effect, search is:" + search);
  // }, [search]);

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
                />
              )
            )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
