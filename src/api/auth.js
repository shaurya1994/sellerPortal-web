// FILE: src/api/auth.js

import api from "./apiClient";
import store from "../store";
import { authSet, authClear } from "../store/authSlice";

/**
 * login: server should set refresh cookie; returns { user, accessToken }
 */
export async function login({ email, password }) {
  const res = await api.post("/auth/login", { email, password });
  const { user, accessToken } = res.data || {};
  store.dispatch(authSet({ user, accessToken }));
  return user;
}

/**
 * logout: server clears refresh cookie; client clears memory token
 */
export async function logout() {
  try { await api.post("/auth/logout"); } catch {}
  store.dispatch(authClear());
}

/**
 * bootstrap: call once on app start to restore session
 * if refresh cookie exists, /auth/refresh returns token+user
 */
export async function bootstrapSession() {
  try {
    const res = await api.post("/auth/refresh");
    const { user, accessToken } = res.data || {};
    if (user && accessToken) {
      store.dispatch(authSet({ user, accessToken }));
      return true;
    }
  } catch {}
  store.dispatch(authClear());
  return false;
}
