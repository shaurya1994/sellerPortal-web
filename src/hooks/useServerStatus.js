// FILE: src/hooks/useServerStatus.js

import { useState, useEffect, useCallback } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

export const useServerStatus = () => {
  const [serverOnline, setServerOnline] = useState(true);
  const [initialCheckDone, setInitialCheckDone] = useState(false);

  const checkServer = useCallback(async () => {
    try {
      // use native fetch with no-cors to avoid CORS warning when server is off
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`${BASE_URL}/jwalaMalini`, {
        method: "GET",
        mode: "no-cors",
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
