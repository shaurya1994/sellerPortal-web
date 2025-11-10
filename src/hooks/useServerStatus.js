// FILE: src/hooks/useServerStatus.js 

import { useState, useEffect } from "react";
import api from "../api/apiClient";

export const useServerStatus = () => {
  const [serverOnline, setServerOnline] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const checkServer = async () => {
    try {
      await api.get("/jwalaMalini", { cache: "no-store", timeout: 3000 });
      setServerOnline(true);
    } catch {
      setServerOnline(false);
    } finally {
      setInitialCheckDone(true);
    }
  };

  useEffect(() => {
    checkServer();
    const interval = setInterval(checkServer, 120000);
    return () => clearInterval(interval);
  }, []);

  return { serverOnline, initialCheckDone, checkServer };
};

// import { useState, useEffect } from "react";

// import api from "../api/apiClient";

// export const useServerStatus = () => {
//   const [serverOnline, setServerOnline] = useState(true);
//   const [initialCheckDone, setInitialCheckDone] = useState(false);

//   const checkServer = async (isInitial = false) => {
//     if (isInitial && !initialCheckDone) setInitialCheckDone(true);

//     try {
//       await api.get("/jwalaMalini", { cache: "no-store" });
//       if (!serverOnline) setServerOnline(true);
//     } catch {
//       if (serverOnline) setServerOnline(false);
//     }
//   };

//   useEffect(() => {
//     checkServer(true);
//     const interval = setInterval(() => checkServer(false), 120000);
//     return () => clearInterval(interval);
//   }, []);

//   return { serverOnline, initialCheckDone, checkServer };
// };
