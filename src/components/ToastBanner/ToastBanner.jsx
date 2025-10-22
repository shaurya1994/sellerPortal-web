// FILE: src/components/ToastBanner/ToastBanner.jsx
import { useEffect, useState } from "react";
import { toastBannerStyles as styles } from "./ToastBanner.styles";

const ToastBanner = ({ message = "", type = "success" }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000); // stays 2s
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
        transform: visible ? "translateY(0)" : "translateY(20px)", // 👈 smooth slide up
      }}
    >
      {message}
    </div>
  );
};

export default ToastBanner;


// // FILE: src/components/ToastBanner/ToastBanner.jsx
// import { memo } from "react";
// import { toastBannerStyles as styles } from "./ToastBanner.styles";

// const ToastBanner = memo(({ message, type = "success" }) => {
//   if (!message) return null;

//   const typeStyle =
//     type === "error" ? styles.toastError : styles.toastSuccess;

//   return (
//     <div style={{ ...styles.toastBanner, ...typeStyle }}>
//       {message}
//     </div>
//   );
// });

// export default ToastBanner;
