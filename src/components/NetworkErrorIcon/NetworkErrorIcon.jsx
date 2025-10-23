// FILE: src/components/NoNetworkState/NoNetworkState.jss

import { networkErrorIconStyles as styles } from "./NetworkErrorIcon.styles";

const NetworkErrorIcon = () => {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      stroke="#1A2530"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={styles.icon}
    >
      {/* Wi-Fi Waves */}
      <path d="M8 26a24 24 0 0 1 48 0" style={styles.wifiWave} />
      <path d="M16 34a16 16 0 0 1 32 0" style={styles.wifiWave} />
      <path d="M24 42a8 8 0 0 1 16 0" style={styles.wifiWave} />

      {/* Red diagonal slash */}
      <line x1="15" y1="50" x2="50" y2="2" style={styles.slash} />

      {/* Cross at bottom */}
      <line x1="30" y1="50" x2="34" y2="54" style={styles.cross} />
      <line x1="30" y1="54" x2="34" y2="50" style={styles.cross} />
    </svg>
  );
};

export default NetworkErrorIcon;
