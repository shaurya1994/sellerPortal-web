// FILE: src/routes/RequireAuth.jsx

import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

import { selectAuth } from "../store/authSlice";

export default function RequireAuth({ children }) {
  const { isAuthenticated } = useSelector(selectAuth);
  const location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  return children;
}
