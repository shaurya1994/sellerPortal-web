import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Hardcoded JWT token (for now, until login flow is built)
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJyb2xlIjoic2VsbGVyIiwibmFtZSI6IlNlbGxlciBPbmUiLCJjb21wYW55X25hbWUiOiJIYXJkd2FyZSBTdXBwbGllcyBQdnQgTHRkIiwiZW1haWwiOiJzZWxsZXIxQGV4YW1wbGUuY29tIiwibW9iaWxlIjoiODg4ODg4ODg4OCIsImdzdF9udW1iZXIiOiIyMkJCQkJCMTExMUIyWjYiLCJpYXQiOjE3NTk5MjkwNDEsImV4cCI6MTc2MDUzMzg0MX0.HIRwAVpLdRaxWyCsGHcPhOE98FRNDX3t2Pdx0OBVPIU";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
});

export default api;
