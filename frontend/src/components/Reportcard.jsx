import { useState } from "react";

const TYPE_CONFIG = {
  "Accident":      { color: "#ef4444", bg: "#450a0a", icon: "🚨" },
  "Road Blockage": { color: "#f97316", bg: "#431407", icon: "🚧" },
  "Weather":       { color: "#3b82f6", bg: "#0c1a3a", icon: "🌧️" },
  "Unsafe Area":   { color: "#a855f7", bg: "#2e1065", icon: "⚠️" },
  "Tip":           { color: "#4ade80", bg: "#052e16", icon: "💡" },
};

export default function ReportCard({ report }) {
  const [helpful, setHelpful] = useState(report.helpful || 0);
  const [voted, setVoted] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(report.comments || []);

  const cfg = TYPE_CONFIG[report.type] || TYPE_CONFIG["Tip"];

  const handleHelpful = () => {
    if (!voted) { setHelpful(h => h + 1); setVoted(true); }
    else { setHelpful(h => h - 1); setVoted(false); }
  };

  const submitComment = () => {
    if (!comment.trim()) return;
    setComments([...comments, { text: comment, user: "You", time: "just now" }]);
    setComment("");
  };

  return (
    <div className="report-card">
      <div className="report-card-header">
        <span className="report-type-badge" style={{ color: cfg.color, background: cfg.bg }}>
          {cfg.icon} {report.type}
        </span>
        <span className="report-time">{report.createdAt}</span>
      </div>
      <h3 className="report-card-title">{report.title}</h3>
      <p className="report-card-desc">{report.description}</p>
      <div className="report-card-meta">
        <span className="report-location">📍 {report.location}</span>
        <span className="report-reporter">by {report.reporter}</span>
      </div>
      <div className="report-card-actions">
        <button className={`action-btn ${voted ? "voted" : ""}`} onClick={handleHelpful}>
          👍 Helpful ({helpful})
        </button>
        <button className="action-btn" onClick={() => setShowComment(!showComment)}>
          💬 Comment ({comments.length})
        </button>
        <div className={`report-status status-${report.status}`}>
          {report.status === "active" ? "🔴 Active" : "✅ Resolved"}
        </div>
      </div>
      {showComment && (
        <div className="comment-section">
          {comments.map((c, i) => (
            <div key={i} className="comment-item">
              <span className="comment-user">{c.user}</span>
              <span className="comment-text">{c.text}</span>
              <span className="comment-time">{c.time}</span>
            </div>
          ))}
          <div className="comment-input-row">
            <input
              className="comment-input"
              placeholder="Add a comment..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              onKeyDown={e => e.key === "Enter" && submitComment()}
            />
            <button className="btn-primary small" onClick={submitComment}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}