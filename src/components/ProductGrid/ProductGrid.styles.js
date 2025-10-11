import { COLORS } from "../../constants/colors";

export const gridStyles = {
  gridWrapper: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    gap: "1.5rem",
  },

  // ✅ Product Card
  productCard: {
    backgroundColor: COLORS.card,
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    border: `2px solid transparent`,
    overflow: "hidden",
    transition: "border 0.2s ease",
  },
  productCardHover: {
    border: `2px solid ${COLORS.primary}`,
  },
  carouselImg: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },
  productInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px",
  },
  productName: {
    fontWeight: 600,
    fontSize: "15px",
    color: COLORS.text,
    margin: 0,
  },
  viewBtn: {
    border: `1px solid ${COLORS.border}`,
    color: COLORS.primary,
    borderRadius: "6px",
    fontSize: "13px",
    fontWeight: 500,
    backgroundColor: "transparent",
    padding: "5px 12px",
  },

  // ✅ Add Product Card
  addCard: {
    backgroundColor: COLORS.card,
    borderRadius: "12px",
    border: `2px solid transparent`,
    height: "295px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "border 0.2s ease",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    position: "relative",
  },
  addBox: {
    width: "90px",
    height: "90px",
    borderRadius: "20px",
    border: `2px dashed ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "54px",
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
    bottom: "50px",
    left: 0,
    right: 0,
  },
  carouselImg: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
    backgroundColor: COLORS.background,
  },

  // ✅ Carousel Buttons
  carouselPrevBtn: {
    width: "55px",
    height: "42px",
    backgroundColor: "rgba(127,140,141,0.7)",
    bottom: 0,
    top: "auto",
    border: "none",
    borderTopRightRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselNextBtn: {
    width: "55px",
    height: "42px",
    backgroundColor: "rgba(127,140,141,0.7)",
    bottom: 0,
    top: "auto",
    border: "none",
    borderTopLeftRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  carouselArrowIcon: {
    filter: "invert(1)",
    backgroundSize: "60%",
  },

  // ✅ Carousel dots
  carouselIndicators: {
    position: "absolute",
    bottom: "4px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
  },

  // ✅ Placeholder of products with no images
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

// import { COLORS } from "../../constants/colors";

// export const productGridStyles = {
//   gridContainer: {
//     display: "flex",
//     flexWrap: "wrap",
//     justifyContent: "start",
//     gap: "1.5rem",
//   },

//   cardWrapper: {
//     flex: "1 1 22%",
//     minWidth: "260px",
//   },

//   productCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: "12px",
//     boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
//     border: `2px solid transparent`,
//     overflow: "hidden",
//     transition: "border 0.2s ease",
//   },

//   productImage: {
//     width: "100%",
//     height: "220px",
//     objectFit: "cover",
//   },

//   productInfo: {
//     backgroundColor: COLORS.white,
//     padding: "16px 20px",
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   productName: {
//     fontWeight: 600,
//     fontSize: "15px",
//     color: COLORS.text,
//     margin: 0,
//   },

//   viewBtn: {
//     border: `1px solid ${COLORS.border}`,
//     color: COLORS.primary,
//     borderRadius: "6px",
//     fontSize: "13px",
//     fontWeight: 500,
//     backgroundColor: "transparent",
//   },

//   addCard: {
//     backgroundColor: COLORS.card,
//     borderRadius: "12px",
//     border: `2px solid transparent`,
//     height: "295px",
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     cursor: "pointer",
//     transition: "border 0.2s ease",
//     boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
//     position: "relative",
//   },

//   addBox: {
//     width: "90px",
//     height: "90px",
//     borderRadius: "20px",
//     border: `2px dashed ${COLORS.border}`,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     fontSize: "54px",
//     color: COLORS.textLight,
//     lineHeight: 1,
//     transition: "all 0.2s ease",
//   },

//   addText: {
//     fontWeight: 600,
//     color: COLORS.text,
//     textAlign: "center",
//     margin: 0,
//     position: "absolute",
//     bottom: "50px",
//     left: 0,
//     right: 0,
//   },

//   noProducts: {
//     textAlign: "center",
//     width: "100%",
//     marginTop: "4rem",
//     color: COLORS.textLight,
//   },

//   // Responsive breakpoints
//   "@media (max-width: 992px)": {
//     cardWrapper: { flex: "1 1 47%", minWidth: "240px" },
//   },
//   "@media (max-width: 576px)": {
//     cardWrapper: { flex: "1 1 100%", minWidth: "100%" },
//   },
// };
