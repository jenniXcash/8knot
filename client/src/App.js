//Librarys
import React from "react";
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

function App() {
  return (
    <React.Fragment>
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
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
