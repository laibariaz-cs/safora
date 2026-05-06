import { useState } from "react";

const MARKERS = [
  { id: 1, x: 160, y: 140, type: "Accident",      title: "M2 Highway Collision",         color: "#ef4444", icon: "🚨" },
  { id: 2, x: 280, y: 175, type: "Road Blockage", title: "Liberty Market Closure",        color: "#f97316", icon: "🚧" },
  { id: 3, x: 110, y: 90,  type: "Weather",       title: "Heavy Fog — GT Road",           color: "#3b82f6", icon: "🌧️" },
  { id: 4, x: 230, y: 220, type: "Unsafe Area",   title: "Anarkali Bazaar Alert",         color: "#a855f7", icon: "⚠️" },
  { id: 5, x: 330, y: 100, type: "Tip",           title: "DHA Phase 5 Rush Hour",         color: "#4ade80", icon: "💡" },
  { id: 6, x: 80,  y: 200, type: "Weather",       title: "River Ravi Flood Risk",         color: "#3b82f6", icon: "🌊" },
];

export default function MapView() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const types = ["All", "Accident", "Road Blockage", "Weather", "Unsafe Area", "Tip"];
  const visible = MARKERS.filter(m => filter === "All" || m.type === filter);

  return (
    <div className="map-page">
      <div className="map-sidebar">
        <h2 className="sidebar-title">Live Safety Map</h2>
        <p className="sidebar-sub">Click markers to view details</p>
        <div className="sidebar-filters">
          {types.map(t => (
            <button key={t} className={`filter-chip small ${filter === t ? "active" : ""}`} onClick={() => setFilter(t)}>{t}</button>
          ))}
        </div>
        <div className="incidents-list">
          <h3 className="incidents-title">Active Incidents ({visible.length})</h3>
          {visible.map(m => (
            <div key={m.id} className={`incident-item ${selected?.id === m.id ? "selected" : ""}`} onClick={() => setSelected(m)}>
              <span className="incident-icon">{m.icon}</span>
              <div>
                <div className="incident-title">{m.title}</div>
                <div className="incident-type" style={{color: m.color}}>{m.type}</div>
              </div>
            </div>
          ))}
        </div>
        {selected && (
          <div className="incident-detail">
            <div className="detail-header" style={{borderColor: selected.color}}>
              <span>{selected.icon}</span>
              <div>
                <div className="detail-title">{selected.title}</div>
                <div className="detail-type" style={{color: selected.color}}>{selected.type}</div>
              </div>
              <button className="close-btn" onClick={() => setSelected(null)}>✕</button>
            </div>
            <p className="detail-desc">Community-reported incident. Exercise caution in this area and consider alternate routes.</p>
            <div className="detail-actions">
              <button className="btn-primary small">👍 Mark Helpful</button>
              <button className="btn-outline small">💬 Comment</button>
            </div>
          </div>
        )}
      </div>

      <div className="map-container">
        <div className="map-controls">
          <button className="map-btn">＋</button>
          <button className="map-btn">－</button>
          <button className="map-btn">⊙</button>
        </div>
        <svg viewBox="0 0 480 360" className="interactive-map" onClick={() => setSelected(null)}>
          <rect width="480" height="360" fill="#0c1a2e"/>
          {[[20,20,80,60],[120,20,80,60],[220,20,80,60],[320,20,80,60],[400,20,60,60],
            [20,100,60,60],[100,100,100,60],[220,100,60,60],[300,100,80,60],[400,100,60,60],
            [20,180,80,60],[120,180,80,60],[220,180,80,60],[320,180,60,60],[400,180,60,60],
            [20,260,100,80],[140,260,80,80],[240,260,100,80],[360,260,100,80]
          ].map(([x,y,w,h],i) => (
            <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="#132036" opacity="0.8"/>
          ))}
          <rect x="0" y="88"  width="480" height="10" fill="#1e3a5f" opacity="0.8"/>
          <rect x="0" y="168" width="480" height="10" fill="#1e3a5f" opacity="0.8"/>
          <rect x="0" y="248" width="480" height="10" fill="#1e3a5f" opacity="0.8"/>
          <rect x="88"  y="0" width="10" height="360" fill="#1e3a5f" opacity="0.8"/>
          <rect x="208" y="0" width="10" height="360" fill="#1e3a5f" opacity="0.8"/>
          <rect x="308" y="0" width="10" height="360" fill="#1e3a5f" opacity="0.8"/>
          <rect x="388" y="0" width="10" height="360" fill="#1e3a5f" opacity="0.8"/>
          <line x1="0" y1="93"  x2="480" y2="93"  stroke="#2d5a8e" strokeWidth="1" strokeDasharray="15,8"/>
          <line x1="0" y1="173" x2="480" y2="173" stroke="#2d5a8e" strokeWidth="1" strokeDasharray="15,8"/>
          <line x1="93"  y1="0" x2="93"  y2="360" stroke="#2d5a8e" strokeWidth="1" strokeDasharray="15,8"/>
          <line x1="213" y1="0" x2="213" y2="360" stroke="#2d5a8e" strokeWidth="1" strokeDasharray="15,8"/>
          <line x1="313" y1="0" x2="313" y2="360" stroke="#2d5a8e" strokeWidth="1" strokeDasharray="15,8"/>
          <circle cx="330" cy="100" r="45" fill="#4ade80" opacity="0.07"/>
          <circle cx="330" cy="100" r="45" fill="none" stroke="#4ade80" strokeWidth="1" strokeDasharray="6,4"/>
          <circle cx="213" cy="173" r="10" fill="#60a5fa" opacity="0.3"/>
          <circle cx="213" cy="173" r="18" fill="#60a5fa" opacity="0.1"/>
          <circle cx="213" cy="173" r="6"  fill="#60a5fa"/>
          <circle cx="213" cy="173" r="3"  fill="white"/>
          {visible.map(m => (
            <g key={m.id} style={{cursor:'pointer'}} onClick={e => { e.stopPropagation(); setSelected(selected?.id === m.id ? null : m); }}>
              <circle cx={m.x} cy={m.y} r={selected?.id === m.id ? 22 : 18} fill={m.color} opacity="0.2"/>
              <circle cx={m.x} cy={m.y} r={selected?.id === m.id ? 16 : 13} fill={m.color} opacity="0.9"/>
              <text x={m.x} y={m.y + 5} textAnchor="middle" fontSize="13">{m.icon}</text>
            </g>
          ))}
          <text x="240" y="350" textAnchor="middle" fill="#3b5c7a" fontSize="11">Lahore City Center</text>
        </svg>
        <div className="map-legend-bar">
          <span className="legend-item"><span style={{color:'#60a5fa'}}>●</span> You</span>
          <span className="legend-item"><span style={{color:'#ef4444'}}>●</span> Accident</span>
          <span className="legend-item"><span style={{color:'#f97316'}}>●</span> Blockage</span>
          <span className="legend-item"><span style={{color:'#3b82f6'}}>●</span> Weather</span>
          <span className="legend-item"><span style={{color:'#a855f7'}}>●</span> Unsafe</span>
          <span className="legend-item"><span style={{color:'#4ade80'}}>●</span> Tip / Safe</span>
        </div>
      </div>
    </div>
  );
}