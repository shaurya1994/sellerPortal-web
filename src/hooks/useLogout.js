// FILE: src/hooks/useLogout.js

import { useSelector } from "react-redux";
import { logout as logoutApi } from "../api/authApi";

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

// FILE: src/hooks/useLogout.js

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { startTransition } from "react";
// import { clearAuth } from "../store/authSlice";
// import { logout as logoutApi } from "../api/authApi";

// export const useLogout = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((s) => s.auth || {});

//   return async () => {
//     try {
//       await logoutApi();
//     } catch (_) {}

//     dispatch(clearAuth());

//     try {
//       localStorage.setItem("logout-event", Date.now().toString());
//     } catch (_) {}

//     const redirect = user?.role === "seller" ? "/s/login" : "/login";
//     startTransition(() => {
//       navigate(redirect, { replace: true });
//     });
//   };
// };
