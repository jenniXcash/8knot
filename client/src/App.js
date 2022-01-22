//Librarys
import React from "react";
import { useState } from "react";
import { Routes, Route } from "react-router-dom";
//Style
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
import SearchPostsResults from "./pages/SearchPostsResults/SearchPostsResults";
import Header from "./components/Header/Header";
import SearchPostsContext from "./context/SearchPostsContext";
function App() {
  const [search, setSearch] = useState("");
  console.log("search in App:" + search);
  return (
    <React.Fragment>
      <SearchPostsContext.Provider value={{ search, setSearch }}>
        <div className="header">
          <Header />
        </div>
        <div className="mainFrame">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/api/posts/"
              element={<SearchPostsResults />}
              search={search}
            />
            <Route path="/PostNew" element={<PostNew />} />
            <Route path="/Dms" element={<Dms />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/PostPage/:id" element={<PostPage />} />
            <Route path="/EnlargeThumbnail" element={<EnlargeThumbnail />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SingleMsg" element={<SingleMsg />} />
            <Route path="/SingleMsg/:id" element={<SingleMsg />} />
          </Routes>
        </div>
      </SearchPostsContext.Provider>
    </React.Fragment>
  );
}

export default App;
