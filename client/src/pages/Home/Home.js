import React, { useContext } from "react";
import { useState, useEffect } from "react";
import SearchPostsContext from "../../context/SearchPostsContext";
import FeedItem from "../../components/FeedItem/FeedItem";
import CircularProgress from "@mui/material/CircularProgress";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [search, setSearch] = useState("");
  const { search, setSearch } = useContext(SearchPostsContext);

  function getPosts(term) {
    const res = fetch(`api/posts/?term=${term}`);
    setLoading(true);
    res
      .then(function (response) {
        return response.json();
      })
      .then(function (posts) {
        setPosts(posts);
        setLoading(false);
      });
  }
  useEffect(() => {
    getPosts(search);
    console.log("used effect, search is:" + search);
  }, [search]);

  return (
    <React.Fragment>
      <div className="mainFrame">
        <div onClick={() => setSearch("5")}>XXX</div>
        <div className="feedItems">
          {loading && <CircularProgress />}
          {posts.map(
            ({
              userName,
              date,
              time,
              address,
              typeOfWork,
              description,
              images,
              _id,
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
              />
            )
          )}
        </div>
      </div>
    </React.Fragment>
  );
}
export default Home;
