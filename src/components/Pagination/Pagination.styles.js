// FILE: src/components/Pagination/Pagination.styles.js

import { COLORS } from "../../constants/colors";

export const paginationStyles = {
  row: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "auto",
    paddingTop: "1rem",
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.35rem",
    maxWidth: "90vw",
  },
  btn: {
    minWidth: "38px",
    padding: "7px 10px",
    borderRadius: "8px",
    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: COLORS.border,
    background: "transparent",
    color: COLORS.text,
    cursor: "pointer",
    fontWeight: 600,
    fontSize: "0.95rem",
    transition: "all 0.15s ease",
  },
  btnActive: {
    background: COLORS.primary,
    color: "#fff",
    borderColor: COLORS.primary,
  },
  btnDisabled: {
    opacity: 0.45,
    cursor: "not-allowed",
  },
};
