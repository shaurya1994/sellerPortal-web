// FILE: src/api/auth.js

import api from "./apiClient";
import store from "../store";
import { setAuth, clearAuth } from "../store/authSlice";

/**
 * login: server should set refresh cookie and return { user, token }
 */
export async function login({ mobile, otp, role }) {
  const res = await api.post("/auth/verify-otp", { mobile, otp, role });
  const { user, token } = res.data || {};
  store.dispatch(setAuth({ user, token }));
  return user;
}

/**
 * logout: clear refresh cookie + memory token
 */
export async function logout() {
  try { await api.post("/auth/logout"); } catch {}
  store.dispatch(clearAuth());
}

/**
 * bootstrap session on app load
 * if refresh cookie exists, get new access token + user
 */
export async function bootstrapSession() {
  try {
    const res = await api.post("/auth/refresh");
    const { user, token } = res.data || {};
    if (user && token) {
      store.dispatch(setAuth({ user, token }));
      return true;
    }
  } catch {}
  store.dispatch(clearAuth());
  return false;
}
