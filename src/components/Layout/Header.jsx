// FILE: src/components/Layout/Header.jsx

import { useSelector } from "react-redux";
import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { layoutStyles } from "./Layout.styles";
import { useLogout } from "../../hooks/useLogout";

import logo from "../../assets/logo.png";
import profile from "../../assets/admin_2.jpeg";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((s) => s.auth || {});
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const logout = useLogout();

  const toggleMenu = () => setShowMenu((p) => !p);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="navbar navbar-expand-lg shadow-sm" style={layoutStyles.header}>
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        <Link
          className="navbar-brand d-flex align-items-center text-white fw-semibold"
          to={user?.role === "seller" ? "/s/products" : "/products"}
        >
          <div style={layoutStyles.logoContainer}>
            <img src={logo} alt="Logo" style={layoutStyles.logo} />
          </div>
          <span className="d-none d-sm-inline" style={layoutStyles.companyName}>
            Raw Alliance
          </span>
        </Link>

        <div className="position-relative" ref={menuRef}>
          <img
            src={profile}
            alt="User"
            style={{ ...layoutStyles.profileImage, cursor: "pointer" }}
            onClick={toggleMenu}
          />

          {showMenu && (
            <div style={layoutStyles.dropdownContainer}>
              <div style={layoutStyles.dropdownHeader}>
                <div style={layoutStyles.dropdownName}>{user?.name || "User"}</div>
                <div style={layoutStyles.dropdownRole}>
                  {user?.role?.toUpperCase() || "GUEST"}
                </div>
              </div>

              <button
                style={layoutStyles.dropdownItem}
                onClick={() => {
                  navigate("/profile");
                  setShowMenu(false);
                }}
              >
                👤 My Info
              </button>

              <button
                style={layoutStyles.dropdownItem}
                onClick={() => {
                  navigate("/settings");
                  setShowMenu(false);
                }}
              >
                ⚙️ Settings
              </button>

              <div style={layoutStyles.dropdownDivider} />

              <button
                style={{ ...layoutStyles.dropdownItem, ...layoutStyles.logoutItem }}
                onClick={logout}
              >
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
