//Librarys
import React from "react";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
//Style,
import "./App.css";
//Pages&Components
import Home from "./pages/Home/Home";
import PostNew from "./pages/PostNew/PostNew";
import Dms from "./pages/Dms/Dms";
import Account from "./pages/Account/Account";
import PostPage from "./pages/PostPage/PostPage";
import EnlargeThumbnail from "./components/EnlargeThumbnail/EnlargeThumbnail";
import SingleMsg from "./pages/SingleMsg/SingleMsg";
import Header from "./components/Header/Header";
import SearchPostsContext from "./context/SearchPostsContext";
import NewUserAdded from "./pages/newUserAdded/NewUserAdded";

function App() {
  const [search, setSearch] = useState("");
  const [posts, setPosts] = useState([]);
  const [registered, setRegistered] = useState();
  const { user } = useAuth0();

  function getPosts(term) {
    const res = fetch(`api/posts/?term=${term}`);
    res
      .then(function (response) {
        return response.json();
      })
      .then(function (posts) {
        setPosts(posts);
        setSearch(term);
      });
  }

  useEffect(() => {
    async function isUserRegistered(id) {
      const response = await fetch(`api/users/:${id}`);
      const data = await response.json();
      setRegistered(data);
    }
    if (user && !registered) {
      const sub = user.sub;
      isUserRegistered(sub);
    }
  }, [user, registered]);

  useEffect(() => {
    getPosts(search);
  }, [search]);

  return (
    <React.Fragment>
      <SearchPostsContext.Provider
        value={{
          search,
          setSearch,
          posts,
          getPosts,
          registered,
          setRegistered,
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
          </Routes>
        </div>
      </SearchPostsContext.Provider>
    </React.Fragment>
  );
}

export default App;
