// FILE: ProductsPage.styles.js
import { COLORS } from "../../constants/colors";

export const productsPageStyles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center", // centers inner content
    gap: "1.25rem",
  },
  // new max-width container for grid + title
  gridContainer: {
    width: "100%",
    padding: "0",
    margin: "0",
    display: "grid",
    justifyItems: "start", // keep cards left-aligned
    alignItems: "start",
    gap: "1.5rem",
  },
  headerRow: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",  // ✅ Left-align “My Products”
    alignItems: "center",
    marginBottom: "0.75rem",
    padding: "0",                 // Match grid start point
  },
  headerLeft: {
    flex: "1 1 auto",
    paddingLeft: "5px"
  },
  // ✏️ clean underline with slightly pointed ends
  titleWrapper: {
    position: "relative",
    display: "inline-block",
    paddingBottom: "6px",
  },
  title: {
    margin: 0,
    fontSize: "1.35rem",
    fontWeight: 700,
    color: COLORS.text,
    lineHeight: 1.15,
    position: "relative",
  },
  titleUnderline: {
    content: "''",
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "2px",
    background: `linear-gradient(90deg, transparent 0%, ${COLORS.primary} 15%, ${COLORS.primary} 85%, transparent 100%)`,
    borderRadius: "2px",
  },
  paginationRow: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
  paginationContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "0.35rem",
    alignItems: "center",
    maxWidth: "90vw",
  },
  paginationBtn: {
    minWidth: "38px",
    padding: "7px 10px",
    borderRadius: "8px",
    border: `1px solid ${COLORS.border}`,
    background: "transparent",
    color: COLORS.text,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "all 0.15s ease",
  },
  paginationBtnActive: {
    background: COLORS.primary,
    color: "#fff",
    borderColor: COLORS.primary,
  },
  paginationBtnDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
  // New
  networkErrorContainer: {
    width: "100%",
    minHeight: "50vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: COLORS.text,
    padding: "2rem 1rem",
  },
  networkErrorIcon: {
    marginBottom: "1rem",
    opacity: 0.85,
  },
  networkErrorTitle: {
    fontSize: "1.25rem",
    fontWeight: 700,
    color: COLORS.danger,
    marginBottom: "0.5rem",
  },
  networkErrorText: {
    color: COLORS.textLight,
    marginBottom: "1rem",
  },
  retryBtn: {
    padding: "0.5rem 1.25rem",
    fontSize: "1rem",
    borderRadius: "6px",
    fontWeight: 600,
  },
  emptyState: {
    width: "100%",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: COLORS.textLight,
    textAlign: "center",
    padding: "2rem 1rem",
  },
  emptyText: {
    fontSize: "1.1rem",
    marginBottom: "1rem",
  },
  addProductBtn: {
    padding: "0.5rem 1.25rem",
    fontWeight: 600,
    borderRadius: "6px",
  },

  loadingContainer: {
    width: "100%",
    minHeight: "60vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    color: COLORS.text,
  },

  loadingSpinner: {
    width: "42px",
    height: "42px",
    border: `4px solid ${COLORS.border}`,
    borderTop: `4px solid ${COLORS.primary}`,
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "1rem",
  },

  loadingText: {
    fontSize: "1.25rem",
    fontWeight: 600,
    color: COLORS.textLight,
  },
  // Till Here

  // small-screen adjustments
  "@media (max-width: 768px)": {
    paginationBtn: {
      minWidth: "32px",
      padding: "6px 8px",
      fontSize: "0.85rem",
      borderRadius: "6px",
    },
    title: {
      fontSize: "1.15rem",
    },
  },
};
