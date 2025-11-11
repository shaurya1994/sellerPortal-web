// FILE: src/components/ToastBanner/ToastBanner.styles.js

import { COLORS } from "../../constants/colors";

export const toastBannerStyles = {
  toastBanner: {
    position: "fixed",
    bottom: "24px",           // 👇 bottom right instead of top center
    right: "24px",
    padding: "10px 18px",
    borderRadius: "8px",
    fontWeight: 600,
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
    zIndex: 4000,
    opacity: 1,
    transition: "opacity 0.4s ease, transform 0.4s ease",
    pointerEvents: "none",
    transform: "translateY(0)",
  },

  toastSuccess: {
    backgroundColor: COLORS.success || "#28a745",
    color: "#fff",
  },

  toastError: {
    backgroundColor: COLORS.danger || "#dc3545",
    color: "#fff",
  },
};