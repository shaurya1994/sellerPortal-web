// FILE: src/hooks/useServerStatus.js

import { useState, useEffect, useCallback } from "react";

export const useServerStatus = () => {
  const [serverOnline, setServerOnline] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const checkServer = useCallback(async () => {
    try {
      // use native fetch with no-cors to avoid CORS warning when server is off
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const res = await fetch("http://localhost:5000/jwalaMalini", {
        method: "GET",
        mode: "no-cors", // prevents CORS error
        signal: controller.signal,
      });

      clearTimeout(timeout);
      // fetch with no-cors always resolves; we can test success by checking type
      setServerOnline(res && res.type !== "opaque" ? res.ok : true);
    } catch {
      setServerOnline(false);
    } finally {
      setInitialCheckDone(true);
    }
  }, []);

  useEffect(() => {
    checkServer();
    const interval = setInterval(checkServer, 120000); // every 2 min
    return () => clearInterval(interval);
  }, [checkServer]);

  return { serverOnline, initialCheckDone, checkServer };
};

// // FILE: src/hooks/useServerStatus.js

// import { useState, useEffect, useCallback } from "react";
// import api from "../api/apiClient";

// export const useServerStatus = () => {
//   const [serverOnline, setServerOnline] = useState(true);
//   const [initialCheckDone, setInitialCheckDone] = useState(false);

//   const checkServer = useCallback(async () => {
//     try {
//       const res = await api.get("/jwalaMalini", { timeout: 3000 }); // 3s timeout
//       setServerOnline(res.status === 200);
//     } catch (err) {
//       // 💡 Handles both CORS + ECONNREFUSED
//       setServerOnline(false);
//     } finally {
//       setInitialCheckDone(true);
//     }
//   }, []);

//   useEffect(() => {
//     checkServer();
//     const interval = setInterval(checkServer, 120000); // every 2 min
//     return () => clearInterval(interval);
//   }, [checkServer]);

//   return { serverOnline, initialCheckDone, checkServer };
// };


// FILE: src/hooks/useServerStatus.js 

// import { useState, useEffect } from "react";
// import api from "../api/apiClient";

// export const useServerStatus = () => {
//   const [serverOnline, setServerOnline] = useState(true);
//   const [initialCheckDone, setInitialCheckDone] = useState(false);

//   const checkServer = async () => {
//     try {
//       await api.get("/jwalaMalini", { cache: "no-store", timeout: 3000 });
//       setServerOnline(true);
//     } catch {
//       setServerOnline(false);
//     } finally {
//       setInitialCheckDone(true);
//     }
//   };

//   useEffect(() => {
//     checkServer();
//     const interval = setInterval(checkServer, 120000);
//     return () => clearInterval(interval);
//   }, []);

//   return { serverOnline, initialCheckDone, checkServer };
// };
