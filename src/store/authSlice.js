// FILE: src/store/authSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, action) {
      const { user, token } = action.payload;
      const role = user?.role;
      state.isAuthenticated = true;
      state.user = user;
      state.token = token;
      state.role = role;

      localStorage.setItem(`auth_${role}_token`, token);
      localStorage.setItem(`auth_${role}_user`, JSON.stringify(user));
    },
    clearAuth(state) {
      const role = state.role;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;

      if (role) {
        localStorage.removeItem(`auth_${role}_token`);
        localStorage.removeItem(`auth_${role}_user`);
      }
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (s) => s.auth;

// // FILE: src/store/authSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null, // JWT returned on OTP verify
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth(state, action) {
//       const { user, token } = action.payload;
//       state.isAuthenticated = true;
//       state.user = user;
//       state.token = token;

//       localStorage.setItem("auth_token", token);
//       localStorage.setItem("auth_user", JSON.stringify(user));
//     },
//     clearAuth(state) {
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;

//       localStorage.removeItem("auth_token");
//       localStorage.removeItem("auth_user");
//     }
//   },
// });

// export const { setAuth, clearAuth } = authSlice.actions;
// export default authSlice.reducer;

// export const selectAuth = (s) => s.auth;
