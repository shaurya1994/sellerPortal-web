// FILE: src/components/NetworkErrorIcon/networkErrorIcon.styles.js

import { COLORS } from "../../constants/colors";

export const networkErrorIconStyles = {
  icon: {
    width: 96,
    height: 96,
    fill: "none",
    stroke: COLORS.text,
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    marginBottom: 16,
  },
  wifiWave: {
    stroke: COLORS.textLight,
  },
  slash: {
    stroke: COLORS.danger,
    strokeWidth: 4,
  },
  cross: {
    stroke: COLORS.textLight,
    strokeWidth: 2.5,
  },
};

