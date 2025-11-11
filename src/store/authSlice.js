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

/**
 * Setup multi-tab auth synchronization.
 * - Pass store instance: setupAuthSync(store)
 * - When other tab writes localStorage key "logout-event", we schedule a dispatch
 *   asynchronously (setTimeout) to avoid interfering with React render.
 */
export const setupAuthSync = (store) => {
  if (typeof window === "undefined" || !window.addEventListener) return;

  window.addEventListener("storage", (e) => {
    try {
      if (e.key === "logout-event") {
        // schedule to avoid dispatching during a render cycle
        setTimeout(() => {
          try {
            store.dispatch(clearAuth());
            // no hard navigation here — let route guards handle redirection
            console.info("Session cleared due to logout in another tab.");
          } catch (err) {
            console.warn("Auth sync dispatch failed:", err);
          }
        }, 0);
      }
    } catch (err) {
      // swallow errors from storage handler
      console.warn("storage handler error:", err);
    }
  });
};



// // FILE: src/store/authSlice.js

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   isAuthenticated: false,
//   user: null,
//   token: null,
//   role: null,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     setAuth(state, action) {
//       const { user, token } = action.payload;
//       const role = user?.role;
//       state.isAuthenticated = true;
//       state.user = user;
//       state.token = token;
//       state.role = role;

//       localStorage.setItem(`auth_${role}_token`, token);
//       localStorage.setItem(`auth_${role}_user`, JSON.stringify(user));
//     },
//     clearAuth(state) {
//       const role = state.role;
//       state.isAuthenticated = false;
//       state.user = null;
//       state.token = null;
//       state.role = null;

//       if (role) {
//         localStorage.removeItem(`auth_${role}_token`);
//         localStorage.removeItem(`auth_${role}_user`);
//       }
//     },
//   },
// });

// export const { setAuth, clearAuth } = authSlice.actions;
// export default authSlice.reducer;
// export const selectAuth = (s) => s.auth;
