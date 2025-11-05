// FILE: src/api/apiClient.js

import axios from "axios";
import store from "../store";
import { authSet, authClear, selectAuth } from "../store/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Strategy:
 * - Send httpOnly cookies (refresh token lives there) via withCredentials
 * - Keep short-lived accessToken in memory (Redux)
 * - Auto-attach Authorization when present
 * - Auto-refresh on 401 using /auth/refresh (server must set cookie)
 * - Support role-aware endpoints via "@role" prefix => "/seller" | "/buyer"
 */
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // send/receive httpOnly cookies
  headers: { "Content-Type": "application/json" },
});

// Resolve @role prefix once per request
function resolveRolePath(url) {
  if (!url?.startsWith("@role")) return url;
  const state = store.getState();
  const role = state?.auth?.user?.role === "seller" ? "seller" : "buyer";
  // const role = state?.auth?.user?.role === "shreem" ? "shreem" : "kleem";
  return url.replace("@role", `/${role}`);
}

// Request interceptor: attach token + rewrite @role
api.interceptors.request.use((config) => {
  const state = store.getState();
  const { accessToken } = selectAuth(state) || {};
  
  config.url = resolveRolePath(config.url);
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
});

// Refresh lock to avoid stampede
let refreshing = null;

async function refreshToken() {
  if (!refreshing) {
    refreshing = api
      .post("/auth/refresh") // server reads refresh cookie, returns { accessToken, user }
      .then((res) => {
        const { accessToken, user } = res.data || {};
        store.dispatch(authSet({ user, accessToken }));
        return accessToken;
      })
      .catch((err) => {
        store.dispatch(authClear());
        throw err;
      })
      .finally(() => {
        refreshing = null;
      });
  }
  return refreshing;
}

// Response interceptor: try refresh on 401 then replay
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;
    const status = error?.response?.status;

    // Don't loop refresh endpoint itself
    const isRefreshCall = original?.url?.includes("/auth/refresh");
    if (status === 401 && !original._retry && !isRefreshCall) {
      original._retry = true;
      try {
        const newToken = await refreshToken();
        original.headers.Authorization = newToken ? `Bearer ${newToken}` : undefined;
        return api(original);
      } catch (e) {
        // redirect to login can be handled by a route guard
      }
    }
    return Promise.reject(error);
  }
);

export default api;
