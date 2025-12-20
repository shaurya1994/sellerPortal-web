// FILE: src/api/axios.js

import axios from "axios";

import store from "../store";
import { setAuth, clearAuth } from "../store/authSlice";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Send cookies (for refresh token)
});

// Attach access token to every request
api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }

  // Only set JSON header when NOT uploading files
  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

// Refresh Token Logic
let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response, // success passthrough
  async (error) => {
    const originalRequest = error.config;

    // If unauthorized & not retrying yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const res = await axios.post(
          `${BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { token, user } = res.data;

        // Update Redux state
        store.dispatch(setAuth({ user, token }));

        processQueue(null, token);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${token}`;
        return api(originalRequest);

      } catch (refreshError) {
        processQueue(refreshError, null);
        store.dispatch(clearAuth());
        return Promise.reject(refreshError);
        
      } finally {
        isRefreshing = false;
      }
    }

    // If not refresh-related, just fail
    return Promise.reject(error);
  }
);

export default api;
