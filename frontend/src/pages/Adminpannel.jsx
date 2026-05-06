import { useState, useEffect } from "react";
import { useAuth } from "../App";

export default function AdminPanel() {
  const { user, navigate, showToast } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [users, setUsers] = useState([]);
  const [reports, setReports] = useState([]);

  useEffect(() => {
    if (user && user.role === "admin") {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [usersRes, reportsRes] = await Promise.all([
        fetch(`${import.meta.env.VITE_API_URL}/users`),
        fetch(`${import.meta.env.VITE_API_URL}/reports`)
      ]);
      const usersData = await usersRes.json();
      const reportsData = await reportsRes.json();
      if (usersData.success) {
        setUsers(usersData.data.map(u => ({ ...u, id: u._id, status: 'active', joined: new Date().toLocaleDateString(), reports: 0 })));
      }
      if (reportsData.success) {
        setReports(reportsData.data.map(r => ({ ...r, id: r._id, status: 'active', reported: new Date(r.createdAt).toLocaleString(), helpful: 0, reporter: r.user || 'Anonymous' })));
      }
    } catch (e) {
      showToast("Error fetching admin data", "error");
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="auth-page">
        <div className="auth-card">
          <div style={{textAlign:'center', padding:'40px 20px'}}>
            <div style={{fontSize:'48px', marginBottom:'16px'}}>🔒</div>
            <h2 style={{color:'#f1f5f9'}}>Admin Access Only</h2>
            <p style={{color:'#64748b', marginBottom:'24px'}}>You don't have permission to view this page.</p>
            <button className="btn-primary" onClick={() => navigate("home")}>Go Home</button>
          </div>
        </div>
      </div>
    );
  }

  const deleteUser = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/users/${id}`, { method: 'DELETE' });
      setUsers(u => u.filter(x => x.id !== id)); 
      showToast("User removed"); 
    } catch (e) { showToast("Error deleting user", "error"); }
  };
  const deleteReport = async (id) => {
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/reports/${id}`, { method: 'DELETE' });
      setReports(r => r.filter(x => x.id !== id)); 
      showToast("Report removed"); 
    } catch (e) { showToast("Error deleting report", "error"); }
  };
  const resolveReport = (id) => { setReports(r => r.map(x => x.id === id ? {...x, status:"resolved"} : x)); showToast("Report resolved"); };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <div>
          <h1 className="page-title">Admin Panel</h1>
          <p className="page-sub">Manage users, reports, and platform content</p>
        </div>
        <div className="admin-badge">🛡️ Admin</div>
      </div>

      <div className="admin-stats">
        {[
          { label: "Total Users",    value: users.length,                                                                              icon: "👥", color: "#60a5fa" },
          { label: "Active Reports", value: reports.filter(r => r.status === "active").length,                                         icon: "📋", color: "#4ade80" },
          { label: "Flagged Items",  value: reports.filter(r => r.status === "flagged").length + users.filter(u => u.status === "flagged").length, icon: "🚩", color: "#ef4444" },
          { label: "Resolved Today", value: "7",                                                                                       icon: "✅", color: "#a855f7" },
        ].map((s, i) => (
          <div key={i} className="admin-stat-card">
            <div className="ds-icon" style={{color: s.color}}>{s.icon}</div>
            <div className="ds-value" style={{color: s.color}}>{s.value}</div>
            <div className="ds-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard-tabs">
        {["overview","users","reports"].map(t => (
          <button key={t} className={`tab-btn ${activeTab === t ? "active" : ""}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
            {t === "reports" && reports.filter(r => r.status === "flagged").length > 0 && (
              <span className="tab-badge">{reports.filter(r => r.status === "flagged").length}</span>
            )}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="tab-content">
          <div className="overview-grid">
            <div className="overview-card">
              <h3>Flagged Reports</h3>
              {reports.filter(r => r.status === "flagged").map(r => (
                <div key={r.id} className="admin-row flagged">
                  <div>
                    <div className="admin-row-title">{r.title}</div>
                    <div className="admin-row-meta">{r.reporter} · {r.reported}</div>
                  </div>
                  <div className="admin-row-actions">
                    <button className="btn-danger small" onClick={() => deleteReport(r.id)}>Delete</button>
                    <button className="btn-outline small" onClick={() => resolveReport(r.id)}>Keep</button>
                  </div>
                </div>
              ))}
              {reports.filter(r => r.status === "flagged").length === 0 && <p className="empty-msg">No flagged reports 🎉</p>}
            </div>
            <div className="overview-card">
              <h3>Flagged Users</h3>
              {users.filter(u => u.status === "flagged").map(u => (
                <div key={u.id} className="admin-row flagged">
                  <div>
                    <div className="admin-row-title">{u.name}</div>
                    <div className="admin-row-meta">{u.email}</div>
                  </div>
                  <button className="btn-danger small" onClick={() => deleteUser(u.id)}>Remove</button>
                </div>
              ))}
              {users.filter(u => u.status === "flagged").length === 0 && <p className="empty-msg">No flagged users 🎉</p>}
            </div>
          </div>
        </div>
      )}

      {activeTab === "users" && (
        <div className="tab-content">
          <div className="admin-table">
            <div className="admin-table-header">
              <span>Name</span><span>Email</span><span>Reports</span><span>Joined</span><span>Status</span><span>Actions</span>
            </div>
            {users.map(u => (
              <div key={u.id} className={`admin-table-row ${u.status === "flagged" ? "flagged-row" : ""}`}>
                <span className="user-name-cell"><div className="mini-avatar">{u.name[0]}</div>{u.name}</span>
                <span>{u.email}</span>
                <span>{u.reports}</span>
                <span>{u.joined}</span>
                <span className={`status-chip ${u.status}`}>{u.status}</span>
                <span><button className="btn-danger small" onClick={() => deleteUser(u.id)}>Delete</button></span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "reports" && (
        <div className="tab-content">
          <div className="admin-table">
            <div className="admin-table-header">
              <span>Title</span><span>Type</span><span>Reporter</span><span>Status</span><span>Helpful</span><span>Actions</span>
            </div>
            {reports.map(r => (
              <div key={r.id} className={`admin-table-row ${r.status === "flagged" ? "flagged-row" : ""}`}>
                <span style={{maxWidth:'200px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{r.title}</span>
                <span>{r.type}</span>
                <span>{r.reporter}</span>
                <span className={`status-chip ${r.status}`}>{r.status}</span>
                <span>👍 {r.helpful}</span>
                <span style={{display:'flex',gap:'6px'}}>
                  {r.status !== "resolved" && <button className="btn-outline small" onClick={() => resolveReport(r.id)}>Resolve</button>}
                  <button className="btn-danger small" onClick={() => deleteReport(r.id)}>Delete</button>
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}