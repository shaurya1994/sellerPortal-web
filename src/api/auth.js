// FILE: src/api/auth.js

import api from "./apiClient";
import store from "../store";
import { setAuth, clearAuth } from "../store/authSlice";

export const requestOtp = (mobile, role) =>
  api.post("/auth/request-otp", { mobile, role });

export const verifyOtp = async (mobile, otp, role) => {
  const res = await api.post("/auth/verify-otp", { mobile, otp, role });
  const { user, token } = res.data;
  store.dispatch(setAuth({ user, token }));
  return user;
};

export const requestSignupOtp = (mobile, role) =>
  api.post("/auth/request-signup-otp", { mobile, role });

export const verifySignupOtp = async (payload) => {
  const res = await api.post("/auth/verify-signup-otp", payload);
  const { user, token } = res.data || {};
  if (user && token) store.dispatch(setAuth({ user, token }));
  return res;
};

export const logout = async () => {
  const state = store.getState();
  const role = state?.auth?.role;
  
  if (role) {
    try {
      localStorage.removeItem(`auth_${role}_token`);
      localStorage.removeItem(`auth_${role}_user`);
    } catch (_) {}
  }
};

function hasRefreshCookie() {
  const keys = Object.keys(localStorage);
  return keys.some((k) => k.startsWith("auth_"));
}

export const bootstrapSession = async () => {
  try {
    if (!hasRefreshCookie()) {
      return false;
    }

    const res = await api.post("/auth/refresh");
    const { user, token } = res.data;
    store.dispatch(setAuth({ user, token }));
    return true;
  } catch (err) {
    store.dispatch(clearAuth());

    if (err?.response?.status === 401) {
      const isSeller = window.location.pathname.startsWith("/s/");
      const loginPath = isSeller ? "/s/login" : "/login";
      if (!window.location.pathname.startsWith(loginPath)) {
        window.location.replace(loginPath);
      }
    }

    return false;
  }
};
