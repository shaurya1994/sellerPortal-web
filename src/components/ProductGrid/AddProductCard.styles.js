// FILE: src/components/ProductGrid/AddProductCard.styles.js
import { COLORS } from "../../constants/colors";

export const addProductCardStyles = {
  addCard: {
    backgroundColor: COLORS.card,
    border: `2px dashed ${COLORS.border}`,
    borderRadius: "12px",
    width: "100%",
    boxShadow: "0 3px 10px rgba(0,0,0,0.06)",
    transition: "all 0.25s ease",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    position: "relative",
  },
  addCardHover: {
    border: `2px solid ${COLORS.primary}`,
    boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
    transform: "translateY(-4px)",
  },
  addBox: {
    width: "84px",
    height: "84px",
    borderRadius: "18px",
    border: `2px dashed ${COLORS.border}`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "52px",
    color: COLORS.textLight,
    lineHeight: 1,
    transition: "all 0.25s ease",
  },
  addBoxHover: {
    border: `2px dashed ${COLORS.primary}`,
    color: COLORS.primary,
    transform: "scale(1.08)",
  },
  addText: {
    fontWeight: 600,
    color: COLORS.text,
    textAlign: "center",
    marginTop: "20px",
    fontSize: "15px",
  },
};
