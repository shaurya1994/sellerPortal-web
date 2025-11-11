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

      try {
        if (role) {
          localStorage.setItem(`auth_${role}_token`, token);
          localStorage.setItem(`auth_${role}_user`, JSON.stringify(user));
        }
      } catch (e) {
        // ignore storage errors
      }
    },
    clearAuth(state) {
      const role = state.role;
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      state.role = null;

      try {
        if (role) {
          localStorage.removeItem(`auth_${role}_token`);
          localStorage.removeItem(`auth_${role}_user`);
        }
      } catch (e) {
        // ignore storage errors
      }
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
export const selectAuth = (s) => s.auth;

// Removed setupAuthSync - no cross-tab logout
export const setupAuthSync = () => {};
