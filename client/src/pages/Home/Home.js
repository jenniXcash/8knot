import React from "react";
import { useState, useEffect } from "react";
import Feed from "../Feed/Feed";
import Header from "../../components/Header/Header";
import "./Home.css";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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
    console.log("search" + search);
  }, [search]);

  console.log(posts);
  return (
    <React.Fragment>
      <div className="header">
        <Header setSearch={setSearch} />
      </div>
      <div className="mainFrame">
        <div onClick={() => setSearch("5")}>XXX</div>
        <Feed posts={posts} loading={loading} />
      </div>
    </React.Fragment>
  );
}
export default Home;
