import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Auth0Provider
        domain="dev-isbj8knt.us.auth0.com"
        clientId="Cga7w1eNDNsfzjbGDdv3OGYBSqAWGwks"
        redirectUri={window.location.origin}
        cacheLocation="localstorage"
      >
        <App />
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
