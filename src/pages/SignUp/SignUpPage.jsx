// FILE: src/pages/SignUp/SignUpPage.jsx

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../api/apiClient";
import { loginStyles as s } from "../Login/LoginPage.styles";

export default function SignUpPage({ defaultRole = "buyer" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const role = useMemo(
    () => (location.pathname.startsWith("/s/") ? "seller" : defaultRole),
    [location.pathname, defaultRole]
  );

  const [form, setForm] = useState({
    name: "",
    company_name: "",
    email: "",
    mobile: "",
    gst_number: "",
  });
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const onChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const submit = async () => {
    setError(""); setOk("");
    try {
      await api.post("/auth/signup", { ...form, role });
      setOk("Account created. Please login.");
      setTimeout(() => navigate(role === "seller" ? "/s/login" : "/login"), 800);
    } catch (e) {
      setError(e?.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div style={s.wrapper}>
      <div style={s.card}>
        <div style={s.title}>Create Account</div>
        <div style={s.subtitle}>{role === "seller" ? "Seller portal" : "Buyer portal"}</div>

        {error && <div style={s.error}>{error}</div>}
        {ok && <div style={{ ...s.error, background: "#e7f7ee", color: "#2c7a4b" }}>{ok}</div>}

        <input style={s.input} name="name" placeholder="Name" value={form.name} onChange={onChange} />
        <input style={s.input} name="company_name" placeholder="Company name" value={form.company_name} onChange={onChange} />
        <input style={s.input} name="email" placeholder="Email" value={form.email} onChange={onChange} />
        <input style={s.input} name="mobile" placeholder="Mobile" value={form.mobile} onChange={onChange} />
        <input style={s.input} name="gst_number" placeholder="GST Number" value={form.gst_number} onChange={onChange} />

        <button style={s.btn} onClick={submit}>Create Account</button>

        <div
          style={s.linkBtn}
          onClick={() => navigate(role === "seller" ? "/s/login" : "/login")}
        >
          Already have an account? Login
        </div>
      </div>
    </div>
  );
}
