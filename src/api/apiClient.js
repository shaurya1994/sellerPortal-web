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

// Resolve @role prefix → /seller or /buyer
function resolveRolePath(url) {
  if (!url?.startsWith("@role")) return url;
  const state = store.getState();
  const role = state?.auth?.role || "buyer"; // Default: buyer 
  return url.replace("@role", `/${role}`);
}

// Attach correct token
api.interceptors.request.use((config) => {
  const state = store.getState();
  const role = state?.auth?.role || "buyer"; // Default: buyer 
  const token = localStorage.getItem(`auth_${role}_token`);

  config.url = resolveRolePath(config.url);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  else delete config.headers.Authorization;

  return config;
});

let refreshing = null;

// Refresh on 401
async function refreshToken() {
  if (!refreshing) {
    refreshing = api
      .post("/auth/refresh")
      .then((res) => {
        const { user, token } = res.data || {};
        store.dispatch(setAuth({ user, token }));
        return token;
      })
      .catch((err) => {
        store.dispatch(clearAuth());
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
        original.headers.Authorization = newToken
          ? `Bearer ${newToken}`
          : undefined;
        return api(original);
      } catch {}
    }
    return Promise.reject(error);
  }
);

export default api;

// // FILE: src/api/apiClient.js

// import axios from "axios";
// import store from "../store";
// import { setAuth, clearAuth, selectAuth } from "../store/authSlice";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: true,
//   headers: { "Content-Type": "application/json" },
// });

// // Resolve @role prefix once per request
// function resolveRolePath(url) {
//   if (!url?.startsWith("@role")) return url;
//   const state = store.getState();
//   const role = state?.auth?.user?.role === "seller" ? "seller" : "buyer";
//   return url.replace("@role", `/${role}`);
// }

// // Request interceptor: attach token + rewrite @role
// api.interceptors.request.use((config) => {
//   const state = store.getState();
//   const { token } = selectAuth(state) || {};

//   config.url = resolveRolePath(config.url);
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   else delete config.headers.Authorization;

//   return config;
// });

// let refreshing = null;

// // Refresh Access Token
// async function refreshToken() {
//   if (!refreshing) {
//     refreshing = api
//       .post("/auth/refresh")
//       .then((res) => {
//         const { user, token } = res.data || {};
//         store.dispatch(setAuth({ user, token }));
//         return token;
//       })
//       .catch((err) => {
//         store.dispatch(clearAuth());
//         throw err;
//       })
//       .finally(() => {
//         refreshing = null;
//       });
//   }
//   return refreshing;
// }

// // Response interceptor: retry once after refresh
// api.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const original = error.config;
//     const status = error?.response?.status;

//     const isRefreshCall = original?.url?.includes("/auth/refresh");

//     if (status === 401 && !original._retry && !isRefreshCall) {
//       original._retry = true;
//       try {
//         const newToken = await refreshToken();
//         original.headers.Authorization = newToken ? `Bearer ${newToken}` : undefined;
//         return api(original);
//       } catch (e) {}
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;
