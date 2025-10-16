// FILE: ProductGrid.styles.js
import { COLORS } from "../../constants/colors";

export const gridStyles = {
  
  gridWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start", // left-align all rows
    alignItems: "flex-start",
    gap: "1.5rem",
    width: "100%",                // fill full container width
    margin: "0",                  // remove auto-centering
    maxWidth: "100%",             // prevent accidental width capping
    boxSizing: "border-box",
    paddingLeft: "0",             // ensure no internal offset
    paddingRight: "0",
  },

  // Add Card
  addCard: {
    backgroundColor: COLORS.card,
    borderRadius: "12px",
    border: `2px solid transparent`,
    height: "295px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "border 0.2s ease, transform 0.2s ease",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    position: "relative",
  },

  addBox: {
    width: "84px",
    height: "84px",
    borderRadius: "18px",
    border: `2px dashed ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "48px",
    color: COLORS.textLight,
    lineHeight: 1,
    transition: "all 0.2s ease",
  },

  addText: {
    fontWeight: 600,
    color: COLORS.text,
    textAlign: "center",
    margin: 0,
    position: "absolute",
    bottom: "44px",
    left: 0,
    right: 0,
  },

  productCard: {
    backgroundColor: COLORS.card,
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    border: `2px solid transparent`,
    overflow: "hidden",
    transition: "border 0.25s ease, transform 0.25s ease",
    height: "auto", // ✅ was fixed 295px
    width: "100%",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start", // ✅ align content naturally
  },

  productCardHover: {
    border: `2px solid ${COLORS.primary}`,
    transform: "translateY(-3px)",
  },

  // carousel image will be set inline in component to match aspect ratio of cardWidth
  carouselImg: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    backgroundColor: COLORS.background,
  },

  productInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 12px 12px 12px", // ✅ reduce bottom padding
    minHeight: "68px",              // ✅ consistent height
  },

  productName: {
    fontWeight: 600,
    fontSize: "15px",
    color: COLORS.text,
    margin: 0,
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },

  viewBtn: {
    border: `1px solid ${COLORS.border}`,
    color: COLORS.primary,
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    backgroundColor: "transparent",
    padding: "6px 12px",
    cursor: "pointer",
    transition: "all 0.2s ease",
  },

  viewBtnHover: {
    backgroundColor: `${COLORS.primary}22`,
  },

  // Csarousel buttons
  carouselPrevBtn: {
    width: "55px",
    height: "42px",
    backgroundColor: "rgba(127,140,141,0.7)",
    bottom: "0",
    top: "auto",
    border: "none",
    borderTopRightRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    pointerEvents: "auto",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    userSelect: "none",
    outline: "none",
  },

  carouselNextBtn: {
    width: "55px",
    height: "42px",
    backgroundColor: "rgba(127,140,141,0.7)",
    bottom: "0",
    top: "auto",
    border: "none",
    borderTopLeftRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    pointerEvents: "auto",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    userSelect: "none",
    outline: "none",
  },

  carouselPrevBtnHover: {
    backgroundColor: "rgba(127,140,141,0.9)",
  },
  carouselNextBtnHover: {
    backgroundColor: "rgba(127,140,141,0.9)",
  },
  carouselBtnActiveFix: {
    backgroundColor: "rgba(127,140,141,0.7)", // reset shade after click
  },


  carouselArrowIcon: {
    filter: "invert(1)",
    backgroundSize: "60%",
    pointerEvents: "auto",
  },

  carouselIndicators: {
    position: "absolute",
    bottom: "15px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    zIndex: 8,
  },

  placeholderBox: {
    width: "100%",
    height: "220px",
    backgroundColor: "#e9ecef",
    color: "#6c757d",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 500,
    fontSize: "14px",
    textAlign: "center",
  },
};
