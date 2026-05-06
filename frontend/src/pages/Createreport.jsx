import { useState } from "react";
import { useAuth } from "../App";

const REPORT_TYPES = [
  { value: "Accident",      icon: "🚨", color: "#ef4444", desc: "Vehicle collisions, crashes" },
  { value: "Road Blockage", icon: "🚧", color: "#f97316", desc: "Construction, closures" },
  { value: "Weather",       icon: "🌧️", color: "#3b82f6", desc: "Fog, floods, storms" },
  { value: "Unsafe Area",   icon: "⚠️", color: "#a855f7", desc: "Crime, security issues" },
  { value: "Tip",           icon: "💡", color: "#4ade80", desc: "Helpful travel advice" },
];

export default function CreateReport() {
  const { navigate, user, showToast } = useAuth();
  const [form, setForm] = useState({ type: "", title: "", description: "", location: "", lat: "", lng: "" });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  if (!user) {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div style={{textAlign:'center', padding:'40px 20px'}}>
            <div style={{fontSize:'48px', marginBottom:'16px'}}>🔒</div>
            <h2 style={{color:'#f1f5f9', marginBottom:'8px'}}>Login Required</h2>
            <p style={{color:'#64748b', marginBottom:'24px'}}>You need to be logged in to submit a safety report.</p>
            <button className="btn-primary" onClick={() => navigate("login")}>Sign In</button>
          </div>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    if (!form.type || !form.title || !form.description || !form.location) {
      showToast("Please fill all required fields", "error");
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, user: user.name })
      });
      const data = await response.json();
      if (data.success) {
        showToast("Report submitted! Thank you for keeping travelers safe 🛡️");
        navigate("reports");
      } else {
        showToast(data.message || "Failed to submit report", "error");
      }
    } catch (error) {
      showToast("Network error. Is the backend running?", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-report-page">
      <div className="create-report-container">
        <div className="create-report-header">
          <button className="back-btn" onClick={() => navigate("reports")}>← Back</button>
          <h1 className="page-title">Submit Safety Report</h1>
          <p className="page-sub">Help your community travel safely by sharing what you know</p>
        </div>

        <div className="step-indicator">
          {["Select Type", "Add Details", "Set Location"].map((s, i) => (
            <div key={i} className={`step ${step > i ? "done" : step === i + 1 ? "active" : ""}`}>
              <div className="step-dot">{step > i + 1 ? "✓" : i + 1}</div>
              <div className="step-label">{s}</div>
            </div>
          ))}
        </div>

        {step === 1 && (
          <div className="step-content">
            <h3 className="step-title">What type of hazard are you reporting?</h3>
            <div className="type-selector">
              {REPORT_TYPES.map(t => (
                <div key={t.value}
                  className={`type-option ${form.type === t.value ? "selected" : ""}`}
                  style={form.type === t.value ? {borderColor: t.color, background: t.color + '15'} : {}}
                  onClick={() => setForm({...form, type: t.value})}>
                  <div className="type-option-icon">{t.icon}</div>
                  <div className="type-option-name" style={form.type === t.value ? {color: t.color} : {}}>{t.value}</div>
                  <div className="type-option-desc">{t.desc}</div>
                </div>
              ))}
            </div>
            <button className="btn-primary step-next" disabled={!form.type} onClick={() => setStep(2)}>Continue →</button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content">
            <h3 className="step-title">Describe the incident</h3>
            <div className="form-group">
              <label className="form-label">Report Title <span className="required">*</span></label>
              <input className="form-input" placeholder="e.g. Heavy fog on GT Road near Gujranwala"
                value={form.title} onChange={e => setForm({...form, title: e.target.value})} maxLength={100} />
              <span className="char-count">{form.title.length}/100</span>
            </div>
            <div className="form-group">
              <label className="form-label">Description <span className="required">*</span></label>
              <textarea className="form-textarea" rows={5}
                placeholder="Severity, alternate routes, estimated time, etc."
                value={form.description} onChange={e => setForm({...form, description: e.target.value})} maxLength={500} />
              <span className="char-count">{form.description.length}/500</span>
            </div>
            <div className="step-btns">
              <button className="btn-outline" onClick={() => setStep(1)}>← Back</button>
              <button className="btn-primary" disabled={!form.title || !form.description} onClick={() => setStep(3)}>Continue →</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="step-content">
            <h3 className="step-title">Where is this hazard located?</h3>
            <div className="form-group">
              <label className="form-label">Location Name <span className="required">*</span></label>
              <input className="form-input" placeholder="e.g. M2 Highway near Lahore interchange"
                value={form.location} onChange={e => setForm({...form, location: e.target.value})} />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Latitude (optional)</label>
                <input className="form-input" type="number" placeholder="31.5204"
                  value={form.lat} onChange={e => setForm({...form, lat: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Longitude (optional)</label>
                <input className="form-input" type="number" placeholder="74.3587"
                  value={form.lng} onChange={e => setForm({...form, lng: e.target.value})} />
              </div>
            </div>
            <div className="location-hint">📍 Tip: Enable location access and we'll auto-fill your coordinates.</div>
            <div className="report-summary">
              <h4 className="summary-title">Report Summary</h4>
              <div className="summary-item"><span>Type:</span> <strong>{form.type}</strong></div>
              <div className="summary-item"><span>Title:</span> <strong>{form.title}</strong></div>
              <div className="summary-item"><span>Location:</span> <strong>{form.location || "Not set"}</strong></div>
            </div>
            <div className="step-btns">
              <button className="btn-outline" onClick={() => setStep(2)}>← Back</button>
              <button className="btn-primary" disabled={!form.location || loading} onClick={handleSubmit}>
                {loading ? <span className="spinner"></span> : "🛡️ Submit Report"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}