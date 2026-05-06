import { useState, useEffect } from "react";
import { useAuth } from "../App";
import ReportCard from "../components/ReportCard";

const TYPES = ["All", "Accident", "Road Blockage", "Weather", "Unsafe Area", "Tip"];

export default function Reports() {
  const { navigate, user } = useAuth();
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/reports`);
        const data = await res.json();
        if (data.success) {
          setReports(data.data.map(r => ({
            ...r,
            id: r._id,
            createdAt: new Date(r.createdAt).toLocaleString(),
            reporter: r.user || 'Anonymous',
            helpful: 0,
            status: 'active'
          })));
        }
      } catch (e) {
        console.error("Failed to fetch reports");
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const filtered = reports.filter(r => {
    const matchType   = filter === "All" || r.type === filter;
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || r.status === statusFilter;
    return matchType && matchSearch && matchStatus;
  });

  return (
    <div className="reports-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Safety Reports</h1>
          <p className="page-sub">Live crowdsourced travel safety updates from the community</p>
        </div>
        {user && <button className="btn-primary" onClick={() => navigate("create-report")}>+ Submit Report</button>}
      </div>

      <div className="filters-bar">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input className="search-input" placeholder="Search by title or location..."
            value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="type-filters">
          {TYPES.map(t => (
            <button key={t} className={`filter-chip ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div>
        <select className="status-select" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div className="reports-count">Showing <strong>{filtered.length}</strong> reports</div>

      {filtered.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <h3>No reports found</h3>
          <p>Try adjusting your filters or search query</p>
        </div>
      ) : (
        <div className="reports-list">
          {filtered.map(r => <ReportCard key={r.id} report={r} />)}
        </div>
      )}
    </div>
  );
}