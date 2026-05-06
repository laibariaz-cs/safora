import { useState } from "react";
import { useAuth } from "../App";

export default function Register() {
  const { setUser, navigate, showToast } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, password: form.password })
      });
      const data = await response.json();
      if (data.success) {
        setUser({ ...data.data, role: "user" });
        showToast("Account created! Welcome to Safora 🎉");
        navigate("dashboard");
      } else {
        showToast(data.message || "Registration failed", "error");
      }
    } catch (error) {
      showToast("Network error. Is the backend running?", "error");
    } finally {
      setLoading(false);
    }
  };

  const f = (field) => ({
    value: form[field],
    onChange: e => setForm({...form, [field]: e.target.value}),
    className: `form-input ${errors[field] ? "input-error" : ""}`
  });

  return (
    <div className="auth-page">
      <div className="auth-card wide">
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
              <path d="M14 2C8.477 2 4 6.477 4 12c0 7 10 16 10 16s10-9 10-16c0-5.523-4.477-10-10-10z" fill="#4ade80"/>
              <circle cx="14" cy="12" r="3.5" fill="#0f172a"/>
            </svg>
          </div>
          <h1 className="auth-title">Join Safora</h1>
          <p className="auth-sub">Become part of the travel safety community</p>
        </div>
        <div className="auth-form">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input type="text" placeholder="Your full name" {...f("name")} />
              {errors.name && <span className="error-msg">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input type="email" placeholder="you@example.com" {...f("email")} />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" placeholder="Min. 6 characters" {...f("password")} />
              {errors.password && <span className="error-msg">{errors.password}</span>}
            </div>
            <div className="form-group">
              <label className="form-label">Confirm Password</label>
              <input type="password" placeholder="Repeat password" {...f("confirm")}
                onKeyDown={e => e.key === "Enter" && handleSubmit()} />
              {errors.confirm && <span className="error-msg">{errors.confirm}</span>}
            </div>
          </div>
          <div className="terms-notice">By signing up you agree to our Terms of Service and Privacy Policy.</div>
          <button className="btn-auth" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Create Account"}
          </button>
        </div>
        <div className="auth-hint">
          <span className="auth-switch">Already have an account?{" "}
            <button className="link-btn" onClick={() => navigate("login")}>Sign In</button>
          </span>
        </div>
      </div>
    </div>
  );
}