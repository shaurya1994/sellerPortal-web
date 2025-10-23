// FILE: ProductsPage.styles.js

import { COLORS } from "../../constants/colors";

export const productsPageStyles = {
  // container: {
  //   width: "100%",
  //   display: "flex",
  //   flexDirection: "column",
  //   alignItems: "center", // Centers inner content
  //   gap: "1.25rem",
  // },
  // gridContainer: {
  //   width: "100%",
  //   padding: "0",
  //   margin: "0",
  //   display: "grid",
  //   justifyItems: "start", // Keep cards left-aligned
  //   alignItems: "start",
  //   gap: "1.5rem",
  // },
// FILE: ProductsPage.styles.js

  container: {
    width: "100%",
    minHeight: "100vh", // ✅ ensures full viewport height
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1.25rem",
    paddingBottom: "1rem", // spacing from bottom
    boxSizing: "border-box",
  },

  gridContainer: {
    width: "100%",
    flex: "1 1 auto", // ✅ grid grows to fill space
    display: "grid",
    justifyItems: "start",
    alignItems: "start",
    gap: "1.5rem",
    padding: "0",
    margin: "0",
  },

  paginationRow: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "auto", // ✅ pushes to bottom
    paddingBottom: "1rem", // some breathing room
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

  headerRow: {
    width: "100%",
    display: "flex",
    justifyContent: "flex-start",  // Left-align “My Products”
    alignItems: "center",
    marginBottom: "0.75rem",
    padding: "0",  // Match grid start point
  },
  headerLeft: {
    flex: "1 1 auto",
    paddingLeft: "5px"
  },
  // Clean underline with slightly pointed ends
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

  // Testing search
  filterBar: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingRight: "10px",
  },

  searchInput: {
    padding: "8px 12px",
    minWidth: "220px",
    border: `1.5px solid ${COLORS.primary}`,
    borderRadius: "6px",
    outline: "none",
    fontSize: "0.95rem",
    color: COLORS.text,
    backgroundColor: COLORS.white,
    boxShadow: `0 0 0 2px transparent`,
    transition: "all 0.2s ease",
  },
    
  customSelectWrapper: {
    position: "relative",
    width: "160px", // ✅ Not 100%, compact
  },

  customSelect: {
    appearance: "none",
    width: "100%",
    padding: "8px 12px",
    border: `1.5px solid ${COLORS.primary}`,
    borderRadius: "6px",
    backgroundColor: COLORS.white,
    color: COLORS.text,
    cursor: "pointer",
    fontSize: "0.95rem",
  },

  dropdownArrow: {
    position: "absolute",
    right: "10px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: COLORS.primary,
    fontSize: "0.75rem",
  },

  // Focus state for both
  searchInputFocus: {
    borderColor: COLORS.text,
    boxShadow: `0 0 0 2px ${COLORS.border}`,
  },


  // paginationRow: {
  //   width: "100%",
  //   display: "flex",
  //   justifyContent: "center",
  //   marginTop: "1rem",
  //   marginBottom: "0.5rem",
  // },
  // paginationContainer: {
  //   display: "flex",
  //   flexWrap: "wrap",
  //   justifyContent: "center",
  //   gap: "0.35rem",
  //   alignItems: "center",
  //   maxWidth: "90vw",
  // },
  // paginationBtn: {
  //   minWidth: "38px",
  //   padding: "7px 10px",
  //   borderRadius: "8px",
  //   border: `1px solid ${COLORS.border}`,
  //   background: "transparent",
  //   color: COLORS.text,
  //   cursor: "pointer",
  //   fontWeight: 600,
  //   fontSize: "0.95rem",
  //   transition: "all 0.15s ease",
  // },
  // paginationBtnActive: {
  //   background: COLORS.primary,
  //   color: "#fff",
  //   borderColor: COLORS.primary,
  // },
  // paginationBtnDisabled: {
  //   opacity: 0.45,
  //   cursor: "not-allowed",
  // },
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

  // Responsive
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
