// FILE: src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";

// Detect role from URL prefix
const isSellerRoute = window.location.pathname.startsWith("/s/");
const role = isSellerRoute ? "seller" : "buyer";

const storedToken = localStorage.getItem(`auth_${role}_token`);
const storedUser = localStorage.getItem(`auth_${role}_user`);

const preloadedState = storedToken
  ? {
      auth: {
        isAuthenticated: true,
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken,
        role,
      },
    }
  : undefined;

const store = configureStore({
  reducer: { auth },
  preloadedState,
});

export default store;
