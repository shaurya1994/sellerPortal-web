import { COLORS } from "../../constants/colors";

export const ordersGridStyles = {
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: "1.75rem",
    boxSizing: "border-box",
  },
  // Pagination  
  paginationRow: {
    display: "flex",
    justifyContent: "center",
    padding: "32px 0",
    marginTop: "20px",
  },
  // Toast container
  toastContainer: {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    background: COLORS.danger, // will be overridden by showToast param
    color: COLORS.white,
    padding: "10px 18px",
    borderRadius: "6px",
    fontWeight: 600,
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    zIndex: 1000,
    opacity: 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "auto",
  },
  /* Date + Filter Row: relative so absolute centering works */
  dateAndFilterRow: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "flex-start", // left-aligned date by default
    gap: "1rem",
    position: "relative",
    padding: "8px 0",
    minHeight: "56px", // reserve vertical space so absolute radio doesn't overlap
  },
  dateHeader: {
    flex: "0 0 auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  dateRangeText: {
    fontSize: "1.1rem",
    fontWeight: 600,
    color: COLORS.text,
    display: "flex",
    alignItems: "center",
    gap: "0.6rem",
    margin: 0,
  },
  dateHighlight: {
    color: COLORS.primary,
    fontWeight: 700,
    backgroundColor: `${COLORS.primary}10`,
    padding: "3px 8px",
    borderRadius: "6px",
  },
  separator: {
    fontSize: "1.15rem",
    color: COLORS.textLight,
    fontWeight: 400,
  },
  /* --- Absolute-centered wrapper (for wide screens) --- */
  radioAbsolute: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: "50%",                // vertically center within the dateAndFilterRow
    translate: "0 -50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    pointerEvents: "auto",
    zIndex: 2,
  },
  /* fallback wrapper (for narrow screens) */
  radioFlowWrapper: {
    flex: "1 1 100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  radioContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.75rem",
    backgroundColor: COLORS.white,
    border: `1px solid ${COLORS.border}`,
    borderRadius: "8px",
    padding: "6px 14px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    padding: "6px 14px",
    borderRadius: "6px",
    border: `1.5px solid ${COLORS.border}`,
    backgroundColor: COLORS.white,
    color: COLORS.textLight,
    fontWeight: 500,
    fontSize: "0.93rem",
    cursor: "pointer",
    transition: "all 0.25s ease",
    userSelect: "none",
  },
  radioLabelActive: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary,
    color: COLORS.white,
    boxShadow: `0 0 6px ${COLORS.primary}33`,
    transform: "scale(1.05)",
  },
  radioInput: { 
    display: "none" 
  },
  /* --- Grid --- */
  gridWrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "1.25rem",
    justifyItems: "stretch",
  },
  // Responsive Grid
  '@media (max-width: 1200px)': {
    gridWrapper: {
      gridTemplateColumns: "repeat(2, 1fr)",
    }
  },
  '@media (max-width: 768px)': {
    gridWrapper: {
      gridTemplateColumns: "1fr",
    }
  },
  orderCardPlaceholder: {
    width: "100%",
    maxWidth: "320px",
    minHeight: "160px",
    border: `1.5px solid ${COLORS.border}`,
    borderRadius: "10px",
    backgroundColor: COLORS.white,
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.95rem",
    transition: "transform 0.2s ease",
  },
  /* --- Empty / Loading States --- */
  loadingContainer: {
    gridColumn: "1 / -1",
    width: "100%",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: "1.15rem",
    fontWeight: 600,
    color: COLORS.textLight,
  },
    emptyState: {
    width: "100%",
    minHeight: "40vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: COLORS.textLight,
    textAlign: "center",
    fontSize: "1.15rem",
    fontWeight: 600,
    letterSpacing: "0.2px",
    padding: "1rem",
    gap: "0.5rem",
    gridColumn: "1 / -1", // Span all columns
    padding: "3rem 0",
  }
};
