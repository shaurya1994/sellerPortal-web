// src/api/authApi.js

import api from "./axios";
import store from "../store";
import { setAuth, clearAuth } from "../store/authSlice";

// Request OTP
export const requestOtp = (mobile) => api.post("/auth/request-otp", { mobile });

// Verify OTP → Login
export const verifyOtp = async (mobile, otp) => {
  const res = await api.post("/auth/verify-otp", { mobile, otp });

  const { user, token } = res.data;

  /**
   * ✅ Allow both buyer & seller to login
   * 🚧 BUT currently only seller UI is built
   * 🎯 We will restrict buyer access at route level later
   */
  store.dispatch(setAuth({ user, token }));

  return user; // return full user info: role, id, etc.
};

// Auto-login using refresh cookie (on page load)
export const bootstrapSession = async () => {
  try {
    const res = await api.post("/auth/refresh");
    const { user, token } = res.data;
    store.dispatch(setAuth({ user, token }));
    return true;

  } catch {
    store.dispatch(clearAuth());
    return false;
  }
};

// Logout
export const logout = () => {
  store.dispatch(clearAuth());
};
