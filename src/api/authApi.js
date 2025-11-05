// FILE: src/api/authApi.js

import store from "../store";
import api from "./apiClient";

import { setAuth, clearAuth } from "../store/authSlice";

// Request OTP with role (enforces existence + role consistency on backend)
export const requestOtp = (mobile, role) =>
  api.post("/auth/request-otp", { mobile, role });

// Verify OTP → issue tokens (no role here)
export const verifyOtp = async (mobile, otp) => {
  const res = await api.post("/auth/verify-otp", { mobile, otp });
  const { user, token } = res.data;
  store.dispatch(setAuth({ user, token }));
  return user;
};

// Auto-login using refresh cookie (on page load)
// export const bootstrapSession = async () => {
//   try {
//     const res = await api.post("/auth/refresh");
//     const { user, token } = res.data;
//     store.dispatch(setAuth({ user, token }));
//     return true;
//   } catch {
//     store.dispatch(clearAuth());
//     return false;
//   }
// };
export const bootstrapSession = async () => {
  try {
    const res = await api.post("/auth/refresh");
    const { user, token } = res.data;
    store.dispatch(setAuth({ user, token }));
    return true;
  } catch {
    // Do NOT log out, just ignore
    return false;
  }
};

// Logout
export const logout = async () => {
  try { await api.post("/auth/logout"); } catch {}
  store.dispatch(clearAuth());
};
