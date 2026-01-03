// FILE: src/pages/SignUp/SignUpPage.jsx

import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { useMemo, useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { loginStyles as s } from "../Login/LoginPage.styles";

import { requestSignupOtp, verifySignupOtp } from "../../api/auth";

const isValidEmail = (v) => /\S+@\S+\.\S+/.test(v);
const isValidMobile = (v) => /^[6-9][0-9]{9}$/.test(v);

export default function SignUpPage({ defaultRole = "buyer" }) {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const role = useMemo(
    () => (location.pathname.startsWith("/s/") ? "seller" : defaultRole),
    [location.pathname, defaultRole]
  );

  const [step, setStep] = useState(1); // 1: form, 2: otp
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const [otp, setOtp] = useState("");
  const [countdown, setCountdown] = useState(0);

  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    mobile: "",
    gst_number: "",
  });

  const countdownRef = useRef(null);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(countdownRef.current);
      countdownRef.current = null;
    }
  }, [countdown]);

  const startCountdown = (seconds = 60) => {
    setCountdown(seconds);
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current);
          countdownRef.current = null;
          return 0;
        }
        return c - 1;
      });
    }, 1000);
  };

  const onChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const validateForm = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim() || !isValidEmail(form.email)) return "Valid email required";
    if (!form.mobile.trim() || !isValidMobile(form.mobile)) return "Valid 10-digit mobile required";
    // GST optional for buyer — backend will validate unique if provided.
    return null;
  };

  const sendOtp = async () => {
    setError("");
    setInfo("");
    const v = validateForm();
    if (v) {
      setError(v);
      return;
    }

    setLoading(true);
    try {
      await requestSignupOtp(form.mobile.trim(), role);
      setInfo("OTP sent to your mobile. Please enter the code.");
      setStep(2);
      startCountdown(60);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const resendOtp = async () => {
    setError("");
    setInfo("");
    setResendLoading(true);
    try {
      await requestSignupOtp(form.mobile.trim(), role);
      setInfo("OTP resent.");
      startCountdown(60);
    } catch (e) {
      setError(e?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };

  const verifyAndCreate = async () => {
    setError("");
    setInfo("");
    if (!otp.trim()) {
      setError("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        mobile: form.mobile.trim(),
        otp: otp.trim(),
        name: form.name.trim(),
        company_name: form.company_name.trim(),
        email: form.email.trim(),
        gst_number: form.gst_number.trim(),
        role,
      };

      const res = await verifySignupOtp(payload);
      // If backend returns user+token -> auto-login
      const { user, token } = res.data || {};
      if (user && token) {
        dispatch(setAuth({ user, token }));
        // redirect to role-specific landing
        const redirectPath = role === "seller" ? "/s/products" : "/products";
        navigate(redirectPath, { replace: true });
        return;
      }

      // If backend only returns message (no auto-login), go to login
      navigate(role === "seller" ? "/s/login" : "/login");
    } catch (e) {
      setError(e?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <div style={s.title}>Create Account</div>
        <div style={s.subtitle}>{role === "seller" ? "Seller portal" : "Buyer portal"}</div>

        {error && <div style={s.error}>{error}</div>}
        {info && <div style={{ ...s.error, background: "#e7f7ee", color: "#2c7a4b" }}>{info}</div>}

        {step === 1 && (
          <>
            <input style={s.input} name="name" placeholder="Name" value={form.name} onChange={onChange} />
            <input style={s.input} name="company_name" placeholder="Company name" value={form.company_name} onChange={onChange} />
            <input style={s.input} name="email" placeholder="Email" value={form.email} onChange={onChange} />
            <input style={s.input} name="mobile" placeholder="Mobile" value={form.mobile} onChange={onChange} />
            <input style={s.input} name="gst_number" placeholder="GST Number (Optional)" value={form.gst_number} onChange={onChange} />

            <button style={s.btn} onClick={sendOtp} disabled={loading}>
              {loading ? "Sending…" : "Send OTP"}
            </button>

            <div
              style={s.linkBtn}
              onClick={() => navigate(role === "seller" ? "/s/login" : "/login")}
            >
              Already have an account? Login
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <div style={{ marginBottom: "0.6rem", fontSize: "0.9rem", color: "#444" }}>
              Enter the 6-digit OTP sent to <strong>{form.mobile}</strong>
            </div>

            <input
              style={s.input}
              placeholder="Enter OTP: 123456"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />

            <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
              <button style={s.btn} onClick={verifyAndCreate} disabled={loading}>
                {loading ? "Verifying…" : "Verify & Create Account"}
              </button>

              <button
                style={{
                  ...s.btn,
                  background: "#fff",
                  color: "#333",
                  border: "1px solid #ddd",
                  width: 140,
                }}
                disabled={resendLoading || countdown > 0}
                onClick={resendOtp}
              >
                {countdown > 0 ? `Resend (${countdown}s)` : "Resend OTP"}
              </button>
            </div>

            <div style={s.linkBtn} onClick={() => setStep(1)}>
              ← Edit details
            </div>
          </>
        )}
      </div>
    </div>
  );
}
