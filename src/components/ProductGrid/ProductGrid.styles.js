import { COLORS } from "../../constants/colors";

export const productGridStyles = {
  gridContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "start",
    gap: "1.5rem",
  },

  cardWrapper: {
    flex: "1 1 22%",
    minWidth: "260px",
  },

  productCard: {
    backgroundColor: COLORS.card,
    borderRadius: "12px",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    border: `2px solid transparent`,
    overflow: "hidden",
    transition: "border 0.2s ease",
  },

  productImage: {
    width: "100%",
    height: "220px",
    objectFit: "cover",
  },

  productInfo: {
    backgroundColor: COLORS.white,
    padding: "16px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
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
  },

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

  noProducts: {
    textAlign: "center",
    width: "100%",
    marginTop: "4rem",
    color: COLORS.textLight,
  },

  // Responsive breakpoints
  "@media (max-width: 992px)": {
    cardWrapper: { flex: "1 1 47%", minWidth: "240px" },
  },
  "@media (max-width: 576px)": {
    cardWrapper: { flex: "1 1 100%", minWidth: "100%" },
  },
};
