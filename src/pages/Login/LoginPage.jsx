// FILE: src/pages/Login/LoginPage.jsx

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { loginStyles as s } from "./LoginPage.styles";
import { requestOtp, verifyOtp } from "../../api/authApi";

export default function LoginPage({ defaultRole = "buyer" }) {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState("mobile");
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // role decided by route: /login => buyer, /s/login => seller
  const role = useMemo(
    () => (location.pathname.startsWith("/s/") ? "seller" : defaultRole),
    [location.pathname, defaultRole]
  );

  const signupPath = role === "seller" ? "/s/signup" : "/signup";

  const sendOtp = async () => {
    setError("");
    if (!/^[6-9][0-9]{9}$/.test(mobile)) {
      setError("Enter valid mobile number");
      return;
    }
    try {
      await requestOtp(mobile, role); // role only here
      setStep("otp");
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to send OTP");
    }
  };

  const submitOtp = async () => {
    setError("");
    try {
      await verifyOtp(mobile, otp); // no role here
      navigate("/products");
    } catch (e) {
      setError(e?.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <div style={s.title}>Welcome 👋</div>
        <div style={s.subtitle}>
          {role === "seller" ? "Seller portal" : "Buyer portal"}
        </div>

        {error && <div style={s.error}>{error}</div>}

        {step === "mobile" && (
          <>
            <input
              style={s.input}
              placeholder="Enter mobile number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
            <button style={s.btn} onClick={sendOtp}>
              Get OTP
            </button>

            <div style={s.linkBtn} onClick={() => navigate(signupPath)}>
              New user? Create an account
            </div>
          </>
        )}

        {step === "otp" && (
          <>
            <input
              style={s.input}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button style={s.btn} onClick={submitOtp}>
              Verify & Continue
            </button>

            <div style={s.linkBtn} onClick={() => setStep("mobile")}>
              ← Back
            </div>
          </>
        )}
      </div>
    </div>
  );
}
