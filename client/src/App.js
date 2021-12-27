//Librarys
import React from "react";
import { Routes, Route } from "react-router-dom";
//Pages&Components
import Home from "./pages/Home/Home";
import PostNew from "./components/PostNew/PostNew";
import Dms from "./components/Dms/Dms";
import Account from "./components/Account/Account";
import Header from "./components/Header/Header";
import PostPage from "./pages/PostPage/PostPage";
import EnlargeThumbnail from "./pages/PostPage/components/EnlargeThumbnail";

//Style
import "./App.css";

function App() {
  // const [enlargedThumbnail, setEnlargedThumbnail] = useSatat(false);
  return (
    <React.Fragment>
      <Header />
      <div className="mainFrame">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/PostNew" element={<PostNew />} />
          <Route path="/Dms" element={<Dms />} />
          <Route path="/Account" element={<Account />} />
          <Route path="/PostPage/:id" element={<PostPage />} />
          <Route path="/EnlargeThumbnail" element={<EnlargeThumbnail />} />
        </Routes>
      </div>
    </React.Fragment>
  );
}

export default App;
