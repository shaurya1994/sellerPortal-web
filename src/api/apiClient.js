// FILE: src/api/apiClient.js

import axios from "axios";
import store from "../store";
import { setAuth, clearAuth } from "../store/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

function resolveRolePath(url) {
  if (!url?.startsWith("@role")) return url;
  const state = store.getState();
  const role = state?.auth?.role || "buyer";
  return url.replace("@role", `/${role}`);
}

api.interceptors.request.use((config) => {
  const state = store.getState();
  const role = state?.auth?.role || "buyer";
  const token = localStorage.getItem(`auth_${role}_token`);

  config.url = resolveRolePath(config.url);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else delete config.headers.Authorization;

  return config;
});

let refreshing = null;

async function refreshToken() {
  if (!refreshing) {
    refreshing = api
      .post("/auth/refresh")
      .then((res) => {
        const { user, token } = res.data || {};
        if (user && token) {
          store.dispatch(setAuth({ user, token }));
          return token;
        }
        throw new Error("Invalid refresh response");
      })
      .catch((err) => {
        store.dispatch(clearAuth());
        
        // Force logout redirect on refresh failure
        const isSeller = window.location.pathname.startsWith("/s/");
        const loginPath = isSeller ? "/s/login" : "/login";
        if (!window.location.pathname.startsWith(loginPath)) {
          window.location.replace(loginPath);
        }
        
        throw err;
      })
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    if (error?.response?.status === 401 && !original._retry) {
      original._retry = true;
      try {
        const newToken = await refreshToken();
        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);
      } catch {
        // Refresh failed, error already handled in refreshToken()
      }
    }
    return Promise.reject(error);
  }
);

export default api;
