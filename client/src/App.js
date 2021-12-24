//Librarys
import React from "react";
import { Routes, Route } from "react-router-dom";
//Pages&Components
import Home from "./pages/Home/Home";
import PostNew from "./components/PostNew/PostNew";
import Dms from "./components/Dms/Dms";
import Account from "./components/Account/Account";
import Header from "./components/Header/Header";
import SideBar from "./components/SideBar/SideBar";
import PostPage from "./pages/PostPage/PostPage";
//Style
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="grid">
        <Header />
        <div className="secondRowFlex">
          <SideBar className="SideBar" />
          <div className="mainFrame">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/PostNew" element={<PostNew />} />
              <Route path="/Dms" element={<Dms />} />
              <Route path="/Account" element={<Account />} />
              <Route path="/PostPage/:id" element={<PostPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default App;
