import { useAuth } from "../App";
import ReportCard from "../components/ReportCard";

const MOCK_REPORTS = [
  { id: 1, type: "Accident", title: "Multi-vehicle collision on M2 Highway", description: "3-car pileup near Lahore interchange. Expect 2hr delays. Use GT Road as alternate.", location: "M2 Highway, Lahore", reporter: "Laiba K.", createdAt: "2 min ago", helpful: 24, status: "active" },
  { id: 2, type: "Road Blockage", title: "Construction closure near Liberty Market", description: "Road completely closed for repair work. Pedestrians affected. Alternate via Gulberg.", location: "Liberty Market, Lahore", reporter: "Ahmed R.", createdAt: "15 min ago", helpful: 18, status: "active" },
  { id: 3, type: "Weather", title: "Heavy fog on GT Road — zero visibility", description: "Dense fog with visibility under 20m. Travel not recommended before 9AM.", location: "GT Road, Punjab", reporter: "Heeram S.", createdAt: "1 hr ago", helpful: 41, status: "active" },
];

const STATS = [
  { value: "12,400+", label: "Reports Filed",   icon: "📋" },
  { value: "3,200+",  label: "Active Users",    icon: "👥" },
  { value: "86",      label: "Cities Covered",  icon: "🏙️" },
  { value: "98%",     label: "Report Accuracy", icon: "✅" },
];

export default function Home() {
  const { navigate, user } = useAuth();

  return (
    <div className="home-page">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-grid"></div>
          <div className="hero-glow"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
            Live Community Safety Network
          </div>
          <h1 className="hero-title">
            Travel Smarter,<br />
            <span className="hero-accent">Travel Safer</span>
          </h1>
          <p className="hero-subtitle">
            Safora connects travelers with real-time crowdsourced safety alerts.
            Report hazards, avoid dangerous routes, and protect your community.
          </p>
          <div className="hero-actions">
            {user ? (
              <button className="btn-hero-primary" onClick={() => navigate("create-report")}>
                <span>📍</span> Submit a Report
              </button>
            ) : (
              <button className="btn-hero-primary" onClick={() => navigate("register")}>
                Get Started Free
              </button>
            )}
            <button className="btn-hero-secondary" onClick={() => navigate("map")}>
              <span>🗺️</span> View Live Map
            </button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="map-preview">
            <div className="map-mock">
              <svg viewBox="0 0 400 300" className="map-svg">
                <rect width="400" height="300" fill="#0f172a"/>
                <line x1="0" y1="150" x2="400" y2="150" stroke="#1e293b" strokeWidth="20"/>
                <line x1="200" y1="0" x2="200" y2="300" stroke="#1e293b" strokeWidth="20"/>
                <line x1="0" y1="80" x2="400" y2="80" stroke="#1e293b" strokeWidth="10"/>
                <line x1="0" y1="220" x2="400" y2="220" stroke="#1e293b" strokeWidth="10"/>
                <line x1="100" y1="0" x2="100" y2="300" stroke="#1e293b" strokeWidth="10"/>
                <line x1="300" y1="0" x2="300" y2="300" stroke="#1e293b" strokeWidth="10"/>
                <line x1="0" y1="150" x2="400" y2="150" stroke="#334155" strokeWidth="1" strokeDasharray="20,10"/>
                <line x1="200" y1="0" x2="200" y2="300" stroke="#334155" strokeWidth="1" strokeDasharray="20,10"/>
                <circle cx="140" cy="130" r="14" fill="#ef4444" opacity="0.9"/>
                <text x="140" y="135" textAnchor="middle" fill="white" fontSize="12">⚠</text>
                <circle cx="290" cy="175" r="14" fill="#f97316" opacity="0.9"/>
                <text x="290" y="180" textAnchor="middle" fill="white" fontSize="12">🚧</text>
                <circle cx="100" cy="80" r="14" fill="#3b82f6" opacity="0.9"/>
                <text x="100" y="85" textAnchor="middle" fill="white" fontSize="12">🌧</text>
                <circle cx="320" cy="80" r="30" fill="#4ade80" opacity="0.15"/>
                <circle cx="320" cy="80" r="30" fill="none" stroke="#4ade80" strokeWidth="1.5"/>
                <text x="320" y="85" textAnchor="middle" fill="#4ade80" fontSize="11">Safe</text>
                <circle cx="200" cy="150" r="8" fill="#4ade80"/>
                <circle cx="200" cy="150" r="16" fill="#4ade80" opacity="0.2"/>
                <circle cx="200" cy="150" r="24" fill="#4ade80" opacity="0.1"/>
              </svg>
              <div className="map-legend">
                <span className="legend-item"><span style={{color:'#ef4444'}}>●</span> Accident</span>
                <span className="legend-item"><span style={{color:'#f97316'}}>●</span> Blockage</span>
                <span className="legend-item"><span style={{color:'#3b82f6'}}>●</span> Weather</span>
              </div>
            </div>
            <div className="map-alert-card">
              <div className="mac-dot red"></div>
              <div>
                <div style={{fontSize:'11px',color:'#94a3b8'}}>Live Alert</div>
                <div style={{fontSize:'13px',color:'#f1f5f9',fontWeight:600}}>M2 Highway blocked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        {STATS.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-icon">{s.icon}</div>
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </section>

      {/* Recent Reports */}
      <section className="recent-section">
        <div className="section-header">
          <div>
            <h2 className="section-title">Recent Safety Reports</h2>
            <p className="section-sub">Live updates from the Safora community</p>
          </div>
          <button className="btn-outline" onClick={() => navigate("reports")}>View All Reports →</button>
        </div>
        <div className="reports-grid">
          {MOCK_REPORTS.map(r => <ReportCard key={r.id} report={r} />)}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title centered">Why Choose Safora?</h2>
        <div className="features-grid">
          {[
            { icon: "⚡", title: "Real-Time Alerts",      desc: "Instant notifications about road hazards, accidents, and dangerous conditions in your area." },
            { icon: "🗺️", title: "Interactive Map",       desc: "Visualize all safety reports on a live map with color-coded risk indicators and route suggestions." },
            { icon: "👥", title: "Community Powered",     desc: "Thousands of verified travelers contribute to a growing network of safety intelligence." },
            { icon: "🛡️", title: "Verified Reports",      desc: "Community ratings and admin moderation ensure only accurate, helpful reports remain visible." },
            { icon: "🔔", title: "Smart Notifications",   desc: "Get proactive alerts based on your saved routes and travel preferences." },
            { icon: "📊", title: "Safety Analytics",      desc: "Track incident trends, peak risk times, and the safest windows to travel your route." },
          ].map((f, i) => (
            <div key={i} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      {!user && (
        <section className="cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Join 3,200+ Travelers Keeping Roads Safer</h2>
            <p className="cta-sub">Create a free account and start contributing to your community's safety today.</p>
            <button className="btn-hero-primary" onClick={() => navigate("register")}>Create Free Account</button>
          </div>
        </section>
      )}
    </div>
  );
}