// FILE: src/components/Layout/LayoutStyles.js

import { COLORS } from "../../constants/colors";

export const layoutStyles = {
  /* HEADER STYLES */
  header: {
    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.textLight}, ${COLORS.text})`,
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem",
    boxShadow: `0 2px 4px ${COLORS.shadow}30`,
  },
  logoContainer: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: `1px solid ${COLORS.border}`,
    boxShadow: `0 2px 6px ${COLORS.shadow}25`,
    marginRight: "10px",
  },
  logo: { width: "36px", height: "36px", objectFit: "contain" },
  companyName: {
    color: COLORS.white,
    fontWeight: 600,
    letterSpacing: "0.3px",
  },
  profileImage: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: `2px solid ${COLORS.white}`,
    objectFit: "cover",
    boxShadow: `0 2px 6px ${COLORS.shadow}40`,
  },
  /* DROPDOWN MENU STYLES */
  dropdownContainer: {
    position: "absolute",
    top: "55px",
    right: 0,
    background: "#fff",
    borderRadius: "12px",
    width: "200px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.15)",
    overflow: "hidden",
    zIndex: 1050,
  },
  dropdownHeader: {
    padding: "12px 16px",
    borderBottom: "1px solid #eee",
    background: "#fafafa",
  },
  dropdownName: {
    fontSize: "0.95rem",
    fontWeight: 600,
    color: "#333",
  },
  dropdownRole: {
    fontSize: "0.8rem",
    color: "#777",
    marginTop: "2px",
  },
  dropdownItem: {
    display: "block",
    width: "100%",
    textAlign: "left",
    padding: "10px 16px",
    fontSize: "0.9rem",
    color: "#333",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    transition: "background 0.2s ease",
  },
  dropdownDivider: {
    borderTop: "1px solid #eee",
    margin: "4px 0",
  },
  logoutItem: {
    color: "#d9534f",
    fontWeight: 500,
  },
  /* TAB SWITCHER */
  tabWrapper: {
    backgroundColor: COLORS.card,
    borderBottom: `1px solid ${COLORS.border}`,
    padding: "1rem 2rem",
    boxShadow: `0 2px 8px ${COLORS.shadow}10`,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  navList: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2.5rem",
    listStyle: "none",
    padding: "0.4rem 0.8rem",
    margin: 0,
    background: `rgba(255, 255, 255, 0.65)`, // Darker for visibility
    backdropFilter: "blur(12px)",
    borderRadius: "14px",
    boxShadow: `inset 0 1px 3px ${COLORS.shadow}25`,
    overflow: "hidden", // Ensures indicator stays inside
  },
  navItem: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
    margin: 0,
  },
  activeIndicator: {
    position: "absolute",
    top: "4px",
    bottom: "4px",
    left: 0,
    backgroundColor: `rgba(255, 255, 255, 0.9)`,
    borderRadius: "10px",
    boxShadow: `0 2px 8px ${COLORS.shadow}25`,
    transition:
      "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    zIndex: 0,
  },
  tabLink: {
    background: "none",
    border: "none",
    position: "relative",
    fontSize: "1.1rem",
    fontWeight: 500,
    color: COLORS.textLight,
    lineHeight: "1",
    letterSpacing: "0.3px",
    padding: "0.7rem 0.8rem",
    cursor: "pointer",
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "color 0.25s ease, font-weight 0.25s ease, transform 0.25s ease",
  },
  tabActive: {
    color: COLORS.primary,
    fontWeight: 600,
  },
  
  /* RESPONSIVE */
  "@media (max-width: 768px)": {
    navList: {
      gap: "1.5rem",
      padding: "0.4rem 0.8rem",
    },
    tabLink: {
      fontSize: "0.95rem",
      padding: "0.6rem 0.6rem",
    },
  },
  "@media (max-width: 576px)": {
    navList: {
      gap: "1rem",
    },
    tabLink: {
      fontSize: "0.9rem",
      padding: "0.5rem 0.6rem",
    },
  },
  /* FOOTER */
  footer: {
    marginTop: "auto",
    background: COLORS.textLight,
    color: COLORS.text,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
    padding: "0 1rem",
    boxShadow: `0 -2px 6px ${COLORS.shadow}15`,
  },
  footerLink: {
    color: COLORS.primary,
    textDecoration: "none",
    marginLeft: "4px",
  },
};
