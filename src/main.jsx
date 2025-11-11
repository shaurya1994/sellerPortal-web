// FILE: src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import store from "./store/index.js";
import { bootstrapSession } from "./api/authApi";

import "./styles/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

async function startApp() {
  const path = window.location.pathname;
  const isLoginPage = path.startsWith("/login") || path.startsWith("/s/login");

  if (!isLoginPage) {
    const success = await bootstrapSession();
    if (!success) {
      const isSeller = path.startsWith("/s/");
      const loginPath = isSeller ? "/s/login" : "/login";
      if (!path.startsWith(loginPath)) {
        window.location.replace(loginPath);
        return;
      }
    }
  }

  if (path === "/") {
    window.location.replace("/login");
    return;
  }

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
}

startApp();
