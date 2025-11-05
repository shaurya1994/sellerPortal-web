// FILE: src/store/index.js

import { configureStore } from "@reduxjs/toolkit";
import auth from "./authSlice";

// Load persisted auth from localStorage (if exists)
const storedToken = localStorage.getItem("auth_token");
const storedUser = localStorage.getItem("auth_user");

const preloadedState = storedToken
  ? {
      auth: {
        isAuthenticated: true,
        user: storedUser ? JSON.parse(storedUser) : null,
        token: storedToken,
      },
    }
  : undefined;

// Create store with preloaded state
const store = configureStore({
  reducer: {
    auth,
  },
  preloadedState,
});

export default store;

// src/store/index.js

// import { configureStore } from "@reduxjs/toolkit";

// import auth from "./authSlice";
// // import orderReducer from "./orderSlice";
// // import productReducer from "./productSlice";

// const store = configureStore({
//   reducer: {
//     auth,
//     // orders: orderReducer,
//     // products: productReducer,
//   },
// });

// export default store;
