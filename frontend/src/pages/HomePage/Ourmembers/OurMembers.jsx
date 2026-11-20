import { useState, useEffect } from "react";
import "./OurMembers.css";
import { API_URL } from "../../../config/api";

export default function  OurMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/members`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch members");
        return res.json();
      })
      .then((data) => {
        setMembers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (filename) =>
    `${API_URL}/uploads/${filename}`;

  if (loading) return <div className="om-page"><p className="om-state">Loading...</p></div>;
  if (error)   return <div className="om-page"><p className="om-state om-error">Error: {error}</p></div>;

  return (
    <div className="om-page">
      {/* Header */}
      <div className="om-header">
        <span className="om-header-dim">Meet With Us</span>
        <span className="om-header-dot"> • </span>
        <span className="om-header-bright">Our Member</span>
      </div>

      {/* Grid */}
      <div className="om-grid">
        {members.map((member, i) => (
          <div className="om-card" key={member.id} style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="om-img-wrap">
              <img loading="lazy" decoding="async"
                src={getImageUrl(member.image)}
                alt={member.name}
                className="om-img"
              />
            </div>
            <div className="om-info">
              <h3 className="om-name">{member.name}</h3>
              <p className="om-position">{member.position}</p>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="om-fab" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}