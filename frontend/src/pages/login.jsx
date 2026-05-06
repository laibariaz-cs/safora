import { useState } from "react";
import { useAuth } from "../App";

export default function Login() {
  const { setUser, navigate, showToast } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await response.json();
      if (data.success) {
        const userData = data.data;
        let role = "user";
        if (userData.email === "admin@safora.com") role = "admin";
        setUser({ ...userData, role });
        showToast(`Welcome back, ${userData.name || 'Admin'}!`);
        navigate(role === "admin" ? "admin" : "dashboard");
      } else {
        showToast(data.message || "Invalid credentials", "error");
      }
    } catch (error) {
      showToast("Network error. Is the backend running?", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <svg width="36" height="36" viewBox="0 0 28 28" fill="none">
              <path d="M14 2C8.477 2 4 6.477 4 12c0 7 10 16 10 16s10-9 10-16c0-5.523-4.477-10-10-10z" fill="#4ade80"/>
              <circle cx="14" cy="12" r="3.5" fill="#0f172a"/>
            </svg>
          </div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-sub">Sign in to your Safora account</p>
        </div>
        <div className="auth-form">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className={`form-input ${errors.email ? "input-error" : ""}`} type="email"
              placeholder="you@example.com" value={form.email}
              onChange={e => setForm({...form, email: e.target.value})} />
            {errors.email && <span className="error-msg">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input className={`form-input ${errors.password ? "input-error" : ""}`} type="password"
              placeholder="••••••••" value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
              onKeyDown={e => e.key === "Enter" && handleSubmit()} />
            {errors.password && <span className="error-msg">{errors.password}</span>}
          </div>
          <button className="btn-auth" onClick={handleSubmit} disabled={loading}>
            {loading ? <span className="spinner"></span> : "Sign In"}
          </button>
        </div>
        <div className="auth-hint">
          <div style={{fontSize:'12px',color:'#64748b',marginBottom:'8px'}}>Demo: admin@safora.com / admin123</div>
          <span className="auth-switch">Don't have an account?{" "}
            <button className="link-btn" onClick={() => navigate("register")}>Sign Up</button>
          </span>
        </div>
      </div>
    </div>
  );
}