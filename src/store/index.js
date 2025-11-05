// src/store/index.js

import { configureStore } from "@reduxjs/toolkit";

import auth from "./authSlice";
// import orderReducer from "./orderSlice";
// import productReducer from "./productSlice";

const store = configureStore({
  reducer: {
    auth,
    // orders: orderReducer,
    // products: productReducer,
  },
});

export default store;
