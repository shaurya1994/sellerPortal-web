// FILE: src/pages/Login/LoginPage.styles.js

import { COLORS } from "../../constants/colors";

export const loginStyles = {
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: COLORS.backgroundLight,
  },
  card: {
    width: "360px",
    padding: "2rem 2.2rem",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
  },
  title: {
    fontSize: "1.45rem",
    fontWeight: 700,
    textAlign: "center",
    color: COLORS.text,
    marginBottom: "0.6rem",
  },
  subtitle: {
    textAlign: "center",
    fontSize: "0.92rem",
    color: COLORS.textSecondary,
    marginBottom: "1.2rem",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "8px",
    border: "1px solid #dcdcdc",
    outline: "none",
    fontSize: "0.9rem",
    marginBottom: "0.9rem",
  },
  btn: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    background: COLORS.primary,
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    marginBottom: "0.7rem",
    transition: "0.25s",
  },
  linkBtn: {
    color: COLORS.primary,
    fontSize: "0.85rem",
    fontWeight: 600,
    textAlign: "center",
    cursor: "pointer",
    marginTop: "0.4rem",
  },
  error: {
    background: "#ffe5e5",
    color: "#d9534f",
    padding: "8px 10px",
    borderRadius: "6px",
    fontSize: "0.85rem",
    textAlign: "center",
    marginBottom: "0.8rem",
  },

  // --- Checking server card ---
  checkingCard: {
    width: "360px",
    padding: "2rem 2.2rem",
    borderRadius: "14px",
    background: "#fff",
    boxShadow: "0 8px 28px rgba(0,0,0,0.06)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
  checkingIcon: {
    fontSize: "2.5rem",
    color: "#ffb74d",
    marginBottom: "12px",
  },
  checkingTitle: {
    fontSize: "1.4rem",
    marginBottom: "8px",
    color: COLORS.text,
    fontWeight: 600,
  },
  checkingText: {
    color: COLORS.textSecondary,
    fontSize: "0.95rem",
    lineHeight: "1.5",
    maxWidth: "280px",
  },
};
