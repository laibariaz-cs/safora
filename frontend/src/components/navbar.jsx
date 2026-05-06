import { useAuth } from "../App";

export default function Navbar({ page, navigate }) {
  const { user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={() => navigate("home")}>
        <div className="nav-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 2C8.477 2 4 6.477 4 12c0 7 10 16 10 16s10-9 10-16c0-5.523-4.477-10-10-10z" fill="#4ade80"/>
            <circle cx="14" cy="12" r="3.5" fill="#0f172a"/>
          </svg>
        </div>
        <span className="nav-brand-text">SAFORA</span>
      </div>

      <div className="nav-links">
        <button className={`nav-link ${page === "home" ? "active" : ""}`} onClick={() => navigate("home")}>Home</button>
        <button className={`nav-link ${page === "reports" ? "active" : ""}`} onClick={() => navigate("reports")}>Reports</button>
        <button className={`nav-link ${page === "map" ? "active" : ""}`} onClick={() => navigate("map")}>Live Map</button>
        {user && <button className={`nav-link ${page === "dashboard" ? "active" : ""}`} onClick={() => navigate("dashboard")}>Dashboard</button>}
        {user?.role === "admin" && <button className={`nav-link ${page === "admin" ? "active" : ""}`} onClick={() => navigate("admin")}>Admin</button>}
      </div>

      <div className="nav-actions">
        {user ? (
          <div className="nav-user">
            <div className="nav-avatar">{user.name?.[0]?.toUpperCase() || "U"}</div>
            <span className="nav-username">{user.name}</span>
            <button className="btn-ghost" onClick={logout}>Logout</button>
          </div>
        ) : (
          <div className="nav-auth">
            <button className="btn-ghost" onClick={() => navigate("login")}>Login</button>
            <button className="btn-primary" onClick={() => navigate("register")}>Sign Up</button>
          </div>
        )}
      </div>
    </nav>
  );
}