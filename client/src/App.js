//Librarys
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//Style,
import "./App.css";
//Pages&Components
import Home from "./pages/Home/Home";
import PostNew from "./pages/PostNew/PostNew";
import Dms from "./pages/Dms/Dms";
import Account from "./pages/Account/Account";
import PostPage from "./pages/PostPage/PostPage";
import EnlargeThumbnail from "./components/EnlargeThumbnail/EnlargeThumbnail";
import SignUp from "./pages/SignUp/SignUp";
import SingleMsg from "./pages/SingleMsg/SingleMsg";
import Header from "./components/Header/Header";
import SearchPostsContext from "./context/SearchPostsContext";
import NewUserAdded from "./pages/newUserAdded/NewUserAdded";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);

  function getPosts(term) {
    console.log(term);
    const res = fetch(`api/posts/?term=${term}`);
    res
      .then(function (response) {
        return response.json();
      })
      .then(function (posts) {
        setPosts(posts);
      });
  }
  useEffect(() => {
    getPosts(search);
  }, [search]);

  return (
    <React.Fragment>
      <SearchPostsContext.Provider
        value={{ search, setSearch, posts, getPosts }}
      >
        <div className="header">
          <Header />
        </div>
        <div className="mainFrame">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PostNew" element={<PostNew />} />
            <Route path="/Dms" element={<Dms />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/PostPage/:id" element={<PostPage />} />
            <Route path="/EnlargeThumbnail" element={<EnlargeThumbnail />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SingleMsg" element={<SingleMsg />} />
            <Route path="/SingleMsg/:id" element={<SingleMsg />} />
            <Route path="/NewUserAdded" element={<NewUserAdded />} />
          </Routes>
        </div>
      </SearchPostsContext.Provider>
    </React.Fragment>
  );
}

export default App;
