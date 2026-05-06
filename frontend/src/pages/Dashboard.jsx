import { useState, useEffect } from "react";
import { useAuth } from "../App";
import ReportCard from "../components/ReportCard";

export default function Dashboard() {
  const { user, navigate } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [reports, setReports] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [reportsRes, alertsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/reports`),
        fetch(`${import.meta.env.VITE_API_URL}/reports/alerts`)
      ]);
      const reportsData = await reportsRes.json();
      const alertsData = await alertsRes.json();
      
      if (reportsData.success) {
        // Filter reports created by the current user if possible, else show all or just mock it as theirs for now
        // Assuming the backend doesn't link user ID to report yet, we just show all reports as an example.
        setReports(reportsData.data.map(r => ({ ...r, id: r._id, createdAt: new Date(r.createdAt).toLocaleString(), helpful: 0, status: 'active' })));
      }
      if (alertsData.success) {
        setAlerts(alertsData.data.map(a => ({ ...a, id: a._id, time: new Date(a.createdAt).toLocaleString(), type: 'alert' })));
      } else {
        // Fallback alerts if API doesn't return them properly
        setAlerts([
          { id: 1, msg: "⚠️ Always verify reports before changing your route.", time: "System", type: "weather" }
        ]);
      }
    } catch (e) {
      console.error("Failed to fetch dashboard data", e);
    }
  };

  if (!user) { navigate("login"); return null; }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="dashboard-welcome">
          <div className="dashboard-avatar">{user.name?.[0]?.toUpperCase()}</div>
          <div>
            <h1 className="dashboard-title">Welcome back, {user.name}!</h1>
            <p className="dashboard-sub">You've helped keep {reports.length * 23} travelers safe this month 🛡️</p>
          </div>
        </div>
        <button className="btn-primary" onClick={() => navigate("create-report")}>+ New Report</button>
      </div>

      <div className="dashboard-stats">
        {[
          { label: "Reports Submitted", value: reports.length, icon: "📋", color: "#4ade80" },
          { label: "Helpful Votes",     value: "46",              icon: "👍", color: "#60a5fa" },
          { label: "People Helped",     value: "184",             icon: "🛡️", color: "#f97316" },
          { label: "Accuracy Score",    value: "94%",             icon: "✅", color: "#a855f7" },
        ].map((s, i) => (
          <div key={i} className="dashboard-stat-card">
            <div className="ds-icon" style={{color: s.color}}>{s.icon}</div>
            <div className="ds-value" style={{color: s.color}}>{s.value}</div>
            <div className="ds-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-tabs">
        {["overview","my-reports","alerts","profile"].map(t => (
          <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {t === "overview" ? "Overview" : t === "my-reports" ? "My Reports" : t === "alerts" ? "Alerts" : "Profile"}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="tab-content">
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Recent Alerts</h3>
              {alerts.slice(0,2).map(a => (
                <div key={a.id} className={`alert-item alert-${a.type}`}>
                  <p>{a.msg || a.title}</p>
                  <span className="alert-time">{a.time}</span>
                </div>
              ))}
              {alerts.length === 0 && <p className="empty-msg">No recent alerts</p>}
            </div>
            <div className="overview-card">
              <h3>Your Latest Report</h3>
              {reports[0] ? <ReportCard report={reports[0]} /> : <p className="empty-msg">No reports yet.</p>}
            </div>
          </div>
        </div>
      )}

      {activeTab === "my-reports" && (
        <div className="tab-content">
          <div className="reports-list">
            {reports.map(r => <ReportCard key={r.id} report={r} />)}
            {reports.length === 0 && <p className="empty-msg">You haven't submitted any reports.</p>}
          </div>
          <button className="btn-outline" onClick={() => navigate("create-report")} style={{marginTop:'16px'}}>+ Submit Another Report</button>
        </div>
      )}

      {activeTab === "alerts" && (
        <div className="tab-content">
          <div className="alerts-list">
            {alerts.map(a => (
              <div key={a.id} className={`alert-item alert-${a.type} full`}>
                <p>{a.msg || a.title}</p>
                <span className="alert-time">{a.time}</span>
              </div>
            ))}
            {alerts.length === 0 && <p className="empty-msg">No alerts found.</p>}
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="tab-content">
          <div className="profile-card">
            <div className="profile-avatar-lg">{user.name?.[0]?.toUpperCase()}</div>
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <input className="form-input" defaultValue={user.name} />
            </div>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" defaultValue={user.email} readOnly />
            </div>
            <div className="form-group">
              <label className="form-label">Role</label>
              <input className="form-input" defaultValue={user.role} readOnly />
            </div>
            <button className="btn-primary">Save Changes</button>
          </div>
        </div>
      )}
    </div>
  );
}