// FILE: src/routes/RequireAuth.jsx

import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RequireAuth = ({ children }) => {
  const { isAuthenticated, user } = useSelector((s) => s.auth || {});
  const location = useLocation();
  const navigate = useNavigate();

  const isSellerRoute = location.pathname.startsWith("/s/");
  const loginPath = isSellerRoute ? "/s/login" : "/login";

  // 1. If not logged in → go to correct login
  if (!isAuthenticated) {
    return <Navigate to={loginPath} replace />;
  }

  const role = user?.role;

  // 2. Role mismatch → redirect to proper home
  useEffect(() => {
    if (role === "seller" && !isSellerRoute) {
      navigate("/s/products", { replace: true });
    } else if (role === "buyer" && isSellerRoute) {
      navigate("/products", { replace: true });
    }
  }, [role, isSellerRoute, navigate]);

  // 3. Back button handling
  useEffect(() => {
    const handlePopState = () => {
      if (role === "seller" && location.pathname !== "/s/products") {
        navigate("/s/products", { replace: true });
      } else if (role === "buyer" && location.pathname !== "/products") {
        navigate("/products", { replace: true });
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [role, location.pathname, navigate]);

  return children;
};

export default RequireAuth;
