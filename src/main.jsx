import React from "react";
import ReactDOM from "react-dom/client";
import App from "./views/App.jsx";
import { HashRouter } from "react-router-dom";
import "jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter forceRefresh={true}>
      <App />
    </HashRouter>
  </React.StrictMode>
);
