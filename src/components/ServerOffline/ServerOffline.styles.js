// FILE: src/components/ServerOffline/ServerOffline.styles.js

import { COLORS } from "../../constants/colors";

export const serverOfflineStyles = {
  wrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "55vh",
    padding: "2rem",
    background: COLORS.background,
  },
  card: {
    background: COLORS.white,
    padding: "2rem 2.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    textAlign: "center",
    maxWidth: "520px",
  },
  title: {
    fontSize: "1.6rem",
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: COLORS.textLight,
    marginBottom: "0.75rem",
  },
  subtext: {
    fontSize: "0.9rem",
    color: "#777",
    marginBottom: "1.25rem",
  },
  retryBtn: {
    background: COLORS.primary,
    color: COLORS.white,
    border: "none",
    borderRadius: "6px",
    padding: "10px 20px",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "background 0.3s ease",
  },
};
