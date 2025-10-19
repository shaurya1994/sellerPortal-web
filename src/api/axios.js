// FILE: src/api/axios.js
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Hardcoded JWT token (for now, until login flow is built)
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoic2VsbGVyIiwibmFtZSI6IlNlbGxlciBPbmUiLCJjb21wYW55X25hbWUiOiJIYXJkd2FyZSBTdXBwbGllcyBQdnQgTHRkIiwiZW1haWwiOiJzZWxsZXIxQGV4YW1wbGUuY29tIiwibW9iaWxlIjoiODg4ODg4ODg4OCIsImdzdF9udW1iZXIiOiIyMkJCQkJCMTExMUIyWjYiLCJpYXQiOjE3NjA1MzQ0MzgsImV4cCI6MTc2MTEzOTIzOH0.i9gG2qvmN-3DAKvzX_PibT0a8U_pY2jfcvas5lRnXts";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default api;

// FILE: src/api/axios.js
// import axios from "axios";

// const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// // Retrieve JWT dynamically (from localStorage, sessionStorage, etc.)
// const getToken = () => {
//   return localStorage.getItem("token") || sessionStorage.getItem("token");
// };

// // Create Axios instance
// const api = axios.create({
//   baseURL: BASE_URL,
//   withCredentials: false, // change to true if your backend uses cookies
// });

// // Interceptor to attach token for every request
// api.interceptors.request.use(
//   (config) => {
//     const token = getToken();

//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     } else {
//       delete config.headers.Authorization;
//     }

//     // ❗ Don’t force "application/json" on multipart uploads
//     if (!(config.data instanceof FormData)) {
//       config.headers["Content-Type"] = "application/json";
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// export default api;
