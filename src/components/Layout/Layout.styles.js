import { COLORS } from "../../constants/colors";

export const layoutStyles = {
  /* HEADER STYLES */
  header: {
    background: `linear-gradient(90deg, ${COLORS.primary}, ${COLORS.textLight}, ${COLORS.text})`,
    paddingTop: "0.6rem",
    paddingBottom: "0.6rem",
    boxShadow: `0 2px 4px ${COLORS.shadow}30`,
  },

  logo: {
    width: "38px",
    height: "38px",
    marginRight: "10px",
    objectFit: "contain",
  },

  companyName: {
    color: COLORS.white,
    fontWeight: 600,
    letterSpacing: "0.3px",
  },

  profileImage: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    border: `2px solid ${COLORS.white}`,
    objectFit: "cover",
    boxShadow: `0 2px 6px ${COLORS.shadow}40`,
  },

  /* TAB SWITCHER */
  tabWrapper: {
    backgroundColor: COLORS.card,
    borderBottom: `2px solid ${COLORS.border}`,
    paddingTop: "0.8rem",
    paddingBottom: "0.6rem",
    boxShadow: `0 1px 3px ${COLORS.shadow}10`,
  },

  navList: {
    gap: "2.5rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    listStyle: "none",
    paddingLeft: 0,
    marginBottom: 0,
  },

  tabLink: {
    background: "none",
    border: "none",
    color: COLORS.textLight,
    fontWeight: 500,
    fontSize: "1rem",
    padding: "0.5rem 0",
    position: "relative",
    transition: "color 0.3s ease",
  },

  tabActive: {
    color: COLORS.primary,
    fontWeight: 600,
    borderBottom: `3px solid ${COLORS.primary}`,
    borderRadius: 0,
  },

  /* RESPONSIVENESS */
  "@media (max-width: 768px)": {
    navList: { gap: "1.5rem" },
    tabLink: { fontSize: "0.95rem" },
  },
  "@media (max-width: 576px)": {
    navList: { gap: "1rem" },
    tabLink: { fontSize: "0.9rem" },
  },

  /**/
  tabWrapper: {
    backgroundColor: COLORS.card,
    borderBottom: `2px solid ${COLORS.border}`,
    padding: "0.8rem 2rem 0.6rem 2rem",
    boxShadow: `0 1px 3px ${COLORS.shadow}10`,
  },


  /* FOOTER */
  footer: {
    marginTop: "auto",
    background: COLORS.textLight,
    color: COLORS.text,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
    padding: "0 1rem",
    boxShadow: `0 -2px 6px ${COLORS.shadow}15`,
  },

  footerLink: {
    color: COLORS.primary,
    textDecoration: "none",
    marginLeft: "4px",
  },
};
