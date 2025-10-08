import { COLORS } from "../../constants/colors";

export const productsPageStyles = {
  tabWrapper: {
    paddingBottom: "0.25rem",
  },
  navList: {
    listStyle: "none",
    paddingLeft: 0,
    marginBottom: 0,
    display: "flex",
    gap: "2rem",
  },
  tabLink: {
    background: "none",
    border: "none",
    color: COLORS.textLight,
    fontSize: "1.05rem",
    fontWeight: 500,
    padding: "10px 0",
    cursor: "pointer",
    borderBottom: `2px solid transparent`,
    transition: "all 0.2s ease",
  },
  tabActive: {
    color: COLORS.primary,
    borderBottom: `2px solid ${COLORS.primary}`,
    fontWeight: 600,
  },
  contentArea: {
    backgroundColor: COLORS.background,
    borderRadius: "8px",
    minHeight: "70vh",
    width: "100%",
  },
};
