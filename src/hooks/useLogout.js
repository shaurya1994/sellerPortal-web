// FILE: src/hooks/useLogout.js

import { useSelector } from "react-redux";
import { logout as logoutApi } from "../api/auth";

export const useLogout = () => {
  const { user } = useSelector((s) => s.auth || {});

  return () => {
    const redirect = user?.role === "seller" ? "/s/login" : "/login";
    
    // Fire API call without awaiting
    logoutApi().catch(() => {});
    
    // Immediate navigation - bypasses all React/Redux lifecycle
    window.location.href = redirect;
  };
};
