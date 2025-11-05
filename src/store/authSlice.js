// // FILE: src/store/authSlice.jsx

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null, // JWT returned on OTP verify
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      const { user, token } = action.payload;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
    },
    clearAuth(state) {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;

export const selectAuth = (s) => s.auth;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   user: null,         // { id, name, role: "buyer" | "seller" }
//   accessToken: null,  // short-lived token in memory (NOT localStorage)
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     authSet(state, action) {
//       const { user, accessToken } = action.payload || {};
//       state.user = user || null;
//       state.accessToken = accessToken || null;
//       state.isAuthenticated = !!user;
//     },
//     authClear(state) {
//       state.user = null;
//       state.accessToken = null;
//       state.isAuthenticated = false;
//     },
//   },
// });

// export const { authSet, authClear } = authSlice.actions;
// export default authSlice.reducer;

// export const selectAuth = (s) => s.auth;
// export const selectMode = (s) => s.auth?.user?.role || "seller"; // default
// // export const selectMode = (s) => s.auth?.user?.role || "shreem"; // default
