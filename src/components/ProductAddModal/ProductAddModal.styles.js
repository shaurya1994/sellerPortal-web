// FILE: ProductAddModal.styles.js
import { COLORS } from "../../constants/colors";

export const productAddModalStyles = {
  modalContent: {
    borderRadius: "10px",
    overflow: "hidden",
  },

  modalBody: {
    padding: "20px 24px",
    maxHeight: "80vh",
    overflowY: "auto",
  },

  title: {
    margin: 0,
    fontSize: "1.35rem",
    fontWeight: 700,
    color: COLORS.text,
    lineHeight: 1.15,
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    position: "relative",
    marginBottom: "10px",
  },

  label: {
    fontSize: "1rem",
    fontWeight: 600,
    color: COLORS.text,
    paddingBottom: "4px",
    display: "inline-block",
  },

  input: {
    fontSize: "1rem",
    padding: "8px 12px",
    borderRadius: "6px",
    border: `1.5px solid ${COLORS.border || "#ccc"}`,
    outline: "none",
    transition: "border-color 0.2s",
  },

  customSelectWrapper: {
    position: "relative",
    width: "100%",
  },

  customSelect: {
    appearance: "none",
    width: "100%",
    padding: "8px 12px",
    border: `1.5px solid ${COLORS.primary}`,
    borderRadius: "6px",
    backgroundColor: "#fff",
    color: COLORS.text,
    cursor: "pointer",
    fontSize: "1rem",
  },

  dropdownArrow: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
    color: COLORS.primary,
    fontSize: "0.8rem",
  },

  photoRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    flexWrap: "wrap",
  },

  browseButton: {
    background: COLORS.primary,
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    fontSize: "0.95rem",
    cursor: "pointer",
    border: "none",
    position: "relative",
    overflow: "hidden",
  },

  hiddenInput: {
    position: "absolute",
    left: 0,
    top: 0,
    opacity: 0,
    cursor: "pointer",
    width: "100%",
    height: "100%",
  },

  photoGridInline: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  photoBox: {
    position: "relative",
    width: "70px",
    height: "70px",
    borderRadius: "6px",
    border: `2px solid ${COLORS.primary}`,
    overflow: "hidden",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  photoThumb: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
  },

  photoBoxHover: {
    transform: "scale(1.05)",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.25)",
  },

  photoRemoveCross: {
    position: "absolute",
    top: "4px",
    right: "4px",
    background: "red",
    border: "none",
    color: "#fff",
    borderRadius: "50%",
    width: "18px",
    height: "18px",
    fontSize: "12px",
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    lineHeight: "1",
    padding: 0,
  },

  variantHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "6px",
  },

  noteText: {
    fontSize: "0.85rem",
    color: COLORS.textLight || "#666",
    marginLeft: "10px",
    flex: "1 1 auto",
  },

  unitToggleContainer: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    flexShrink: 0,
  },

  unitToggleButton: {
    border: `1.5px solid ${COLORS.primary}`,
    backgroundColor: "#fff",
    color: COLORS.primary,
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.25s ease",
    fontSize: "0.8rem",
    lineHeight: "1",
  },

  unitToggleActive: {
    backgroundColor: COLORS.primary,
    color: "#fff",
    boxShadow: `0 0 0 1px ${COLORS.primaryLight || "rgba(0,0,0,0.1)"}`,
  },

  variantRow: {
    display: "flex",
    gap: "8px",
    marginBottom: "8px",
    alignItems: "center",
  },

  variantInput: {
    flex: "1 1 120px",
    fontSize: "1rem",
    padding: "6px 10px",
    borderRadius: "6px",
    border: `1.5px solid ${COLORS.border || "#ccc"}`,
  },

  variantRemoveBtn: {
    background: "transparent",
    // border: `1.5px solid ${"#a72c28ff"}`,
    border: `1.5px solid ${COLORS.danger}`,
    color: "#a72c28ff",
    // color: COLORS.danger,
    padding: "6px 10px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.85rem",
  },

  addVariantBtn: {
    background: COLORS.primary,
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: 500,
    fontSize: "0.9rem",
    alignSelf: "flex-start",
  },

  submitBtn: {
    background: COLORS.success || "#28a745",
    border: "none",
    color: "#fff",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: 600,
    alignSelf: "flex-end",
  },
};
