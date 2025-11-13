// FILE: src/components/OrdersGrid/OrdersGridCard.styles.js

import { COLORS } from "../../constants/colors";

export const orderGridCardStyles = {
  /* CARD WRAPPER */
  card: {
    width: "100%",
    borderRadius: "10px",
    backgroundColor: COLORS.white,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
    overflow: "hidden",
    transition: 'all 0.15s ease',
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    border: `2px solid ${COLORS.border}`,
    willChange: "transform, box-shadow",
  },

  /* MAIN CONTENT */
  content: {
    display: "flex",
    flexDirection: "row",
    alignItems: "stretch",
    width: "100%",
    paddingRight: "6px",
  },

  /* LEFT IMAGE SECTION */
  imageContainer: {
    position: "relative",
    flex: "0 0 36%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "6px",
    backgroundColor: "transparent",
  },

  imageWrapper: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "150px",
    backgroundColor: COLORS.white,
    borderRadius: "8px",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 24px rgba(0,0,0,0.08)",
    transition: "box-shadow 0.2s ease",
  },

  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },

  placeholder: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "2.2rem",
    color: "#9aa0a6",
    opacity: 0.55,
  },

  /* --- CAROUSEL BUTTONS --- */
  carouselPrevBtn: {
    width: "34px",
    height: "28px",
    backgroundColor: "rgba(127,140,141,0.7)",
    position: "absolute",
    left: 0,
    bottom: 0,
    border: "none",
    borderTopRightRadius: 6,
    borderBottomLeftRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
    cursor: "pointer",
    transition: "background-color 0.15s ease, transform 0.2s ease",
    outline: "none",
  },

  carouselNextBtn: {
    width: "34px",
    height: "28px",
    backgroundColor: "rgba(127,140,141,0.7)",
    position: "absolute",
    right: 0,
    bottom: 0,
    border: "none",
    borderTopLeftRadius: 6,
    borderBottomRightRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 30,
    cursor: "pointer",
    transition: "background-color 0.15s ease, transform 0.2s ease",
    outline: "none",
  },

  carouselBtnHover: {
    backgroundColor: "rgba(127,140,141,0.9)",
    transform: "scale(1.05)",
  },

  carouselArrowLeft: {
    width: "8px",
    height: "8px",
    borderTop: "2px solid rgba(80,80,80,0.8)",
    borderLeft: "2px solid rgba(80,80,80,0.8)",
    transform: "rotate(-45deg)",
    marginLeft: "3px",
  },

  carouselArrowRight: {
    width: "8px",
    height: "8px",
    borderTop: "2px solid rgba(80,80,80,0.8)",
    borderRight: "2px solid rgba(80,80,80,0.8)",
    transform: "rotate(45deg)",
    marginRight: "3px",
  },

  dotsWrap: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    bottom: "8px",
    display: "flex",
    gap: "6px",
    zIndex: 25,
    alignItems: "center",
    justifyContent: "center",
    pointerEvents: "none",
  },

  dot: {
    width: "6px",
    height: "6px",
    borderRadius: "50%",
    backgroundColor: "rgba(127,140,141,0.65)",
    border: "1px solid rgba(80,80,80,0.3)",
    cursor: "pointer",
    pointerEvents: "auto",
    transition: "transform 0.15s ease, background-color 0.15s ease",
  },

  dotActive: {
    backgroundColor: "rgba(127,140,141,0.9)",
    border: "1px solid rgba(80,80,80,0.5)",
    transform: "scale(1.35)",
  },

  /* --- RIGHT DETAILS SECTION --- */
  rightColumn: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },

  statsRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    borderBottom: `1px solid ${COLORS.border}`,
  },

  statBlock: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },

  statDivider: {
    width: "1px",
    height: "40px",
    backgroundColor: COLORS.border,
  },

  statNumber: {
    fontSize: "1.1rem",
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: "4px",
  },

  statLabel: {
    fontSize: "0.72rem",
    fontWeight: 500,
    color: COLORS.textLight,
    textTransform: "uppercase",
    letterSpacing: "0.6px",
  },

  details: {
    padding: "10px 14px 14px",
    display: "flex",
    flexDirection: "column",
  },

  productName: {
    fontSize: "1rem",
    fontWeight: 700,
    color: COLORS.text,
    marginBottom: "6px",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    transition: "color 0.2s ease",
  },

  category: {
    fontSize: "0.86rem",
    fontWeight: 600,
    color: COLORS.primary,
    marginBottom: "6px",
  },

  meta: {
    fontSize: "0.82rem",
    color: COLORS.textLight,
    fontWeight: 500,
  },

  /* --- RESPONSIVE --- */
  "@media (max-width: 600px)": {
    content: { flexDirection: "column" },
    imageWrapper: { minHeight: "180px" },
    statsRow: { flexDirection: "column", gap: "8px" },
    statDivider: { display: "none" },
  },
};
