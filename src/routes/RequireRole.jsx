// FILE: src/routes/RequireRole.jsx

import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { selectAuth } from "../store/authSlice";

export default function RequireRole({ role, children }) {
  const { isAuthenticated, user } = useSelector(selectAuth);

  // Not logged in → kick to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Role mismatch → redirect to a safe page (later buyer dashboard)
  if (user?.role !== role) {
    return <Navigate to="/" replace />; // or "/buyer/home" later
  }

  return children;
}
