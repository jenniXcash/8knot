import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import PostNew from "./pages/PostNew/PostNew";
import Dms from "./components/Dms/Dms";
import Account from "./components/Account/Account";
import Header from "./components/Header/Header";
function App() {
  return (
    <React.Fragment>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PostNew" element={<PostNew />} />
        <Route path="/Dms" element={<Dms />} />
        <Route path="/Account" element={<Account />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
