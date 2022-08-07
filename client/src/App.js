//Librarys
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
//Style
import "./App.css";
//Context

//Pages&Components
import Home from "./pages/Home/Home";
import PostNew from "./pages/PostNew/PostNew";
import Dms from "./pages/Dms/Dms";
import Account from "./pages/Account/Account";
import PostPage from "./pages/PostPage/PostPage";
import EnlargeThumbnail from "./components/EnlargeThumbnail/EnlargeThumbnail";
import SingleMsg from "./pages/SingleMsg/SingleMsg";
import Header from "./components/Header/Header";
import NewUserAdded from "./pages/newUserAdded/NewUserAdded";
import SignUp from "./pages/SignUp/SignUp";
import LoginPage from "./pages/LoginPage/LoginPage";
//Context
import UserContext from "./context/UserContext";
import SearchPostsContext from "./context/SearchPostsContext";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");

  async function getPosts(term) {
    const res = await fetch(`api/posts/?term=${term}`);
    const posts = await res.json();
    setPosts(posts);
    setSearch(search);
  }

  function getCookie() {
    var b = document.cookie.match(
      "(^|;)\\s*" + "username" + "\\s*=\\s*([^;]+)"
    );

    return b ? b.pop() : "";
  }

  useEffect(() => {
    getPosts(search);
  }, [search]);

  useEffect(() => {
    setUser(getCookie());
    console.log(user);
  }, [user]);

  return (
    <React.Fragment>
      <UserContext.Provider value={user}>
        <SearchPostsContext.Provider
          value={{
            search,
            setSearch,
            posts,
            getPosts,
          }}
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
              <Route path="/SingleMsg" element={<SingleMsg />} />
              <Route path="/SingleMsg/:id" element={<SingleMsg />} />
              <Route path="/NewUserAdded" element={<NewUserAdded />} />
              <Route path="/SignUp" element={<SignUp />} />
              <Route path="/LoginPage" element={<LoginPage />} />
            </Routes>
          </div>
        </SearchPostsContext.Provider>
      </UserContext.Provider>
    </React.Fragment>
  );
}

export default App;
