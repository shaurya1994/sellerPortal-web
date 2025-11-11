// FILE: src/components/ToastBanner/ToastBanner.jsx
import { useEffect, useState } from "react";
import { toastBannerStyles as styles } from "./ToastBanner.styles";

const ToastBanner = ({ message = "", type = "success" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000); // Stays 2s
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message) return null;

  return (
    <div
      style={{
        ...styles.toastBanner,
        ...(type === "success" ? styles.toastSuccess : styles.toastError),
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(20px)", // Smooth slide up
      }}
    >
      {message}
    </div>
  );
};

export default ToastBanner;
