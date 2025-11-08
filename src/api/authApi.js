// FILE: src/api/authApi.js

import api from "./apiClient";
import store from "../store";
import { setAuth, clearAuth } from "../store/authSlice";

// ********************* Login ********************* //
// Request OTP
export const requestOtp = (mobile, role) =>
  api.post("/auth/request-otp", { mobile, role });

// Verify OTP → Login
export const verifyOtp = async (mobile, otp, role) => {
  const res = await api.post("/auth/verify-otp", { mobile, otp, role });
  const { user, token } = res.data;
  store.dispatch(setAuth({ user, token }));
  return user;
};

// ********************* Sign-up ********************* //
// Request OTP for signup
export const requestSignupOtp = (mobile, role) =>
  api.post("/auth/request-signup-otp", { mobile, role });

// Verify OTP → Create user + auto-login
export const verifySignupOtp = async (payload) => {
  const res = await api.post("/auth/verify-signup-otp", payload);
  const { user, token } = res.data || {};
  if (user && token) store.dispatch(setAuth({ user, token }));
  return res;
};

// ********************* Session ********************* //
export const logout = () => {
  store.dispatch(clearAuth());
};

// Check if refresh cookie likely exists
function hasRefreshCookie() {
  // Browsers hide httpOnly cookies from JS, so we infer:
  // If no token in localStorage/sessionStorage → assume no valid session.
  const keys = Object.keys(localStorage);
  const hasAnyAuthKey = keys.some((k) => k.startsWith("auth_"));
  return hasAnyAuthKey; // Only try refresh if token exists
}

// Bootstrap session
export const bootstrapSession = async () => {
  try {
    // ✅ Skip refresh if clearly no auth in storage
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
