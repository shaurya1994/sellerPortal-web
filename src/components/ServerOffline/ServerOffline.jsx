// FILE: src/components/ServerOffline/ServerOffline.jsx

import { useState } from "react";
import { serverOfflineStyles as styles } from "./ServerOffline.styles";

const ServerOffline = ({ onRetry }) => {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    if (!onRetry) return;
    setIsRetrying(true);
    await onRetry();
    setIsRetrying(false);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>🚧 Server Offline</h2>
        <p style={styles.message}>
          Our servers are currently unavailable outside of regular operating hours.
          <br />
          <strong>Available daily from 9:00 AM to 6:00 PM (IST).</strong>
          <br />
          Check back during this time for full access.
        </p>
        {/* <p style={styles.subtext}>Thank you</p> */}

        {onRetry && (
          <button
            style={{
              ...styles.retryBtn,
              opacity: isRetrying ? 0.7 : 1,
              cursor: isRetrying ? "not-allowed" : "pointer",
            }}
            onClick={handleRetry}
            disabled={isRetrying}
          >
            {isRetrying ? "Checking..." : "Retry Connection"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ServerOffline;
