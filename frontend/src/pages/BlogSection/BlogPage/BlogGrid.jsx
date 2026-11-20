import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./BlogGrid.css";
import { API_URL } from "../../../config/api";

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default function BlogGrid() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/blog`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch blogs");
        return r.json();
      })
      .then((d) => {
        setPosts(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (f) => `${API_URL}/uploads/${f}`;

  if (loading)
    return (
      <div className="bg-page">
        <p className="bg-state">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="bg-page">
        <p className="bg-state bg-error">Error: {error}</p>
      </div>
    );

  return (
    <div className="bg-page">
      <div className="row g-0 mx-0 p-5">
        {posts.map((post, i) => (
          <div
            key={post.id}
            className="col-12 col-md-4"
            onMouseEnter={() => setHovered(post.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => navigate(`/blog/${post.id}`)}
          >
            <div className="bg-card">
              {/* Image */}
              <div className="bg-img-wrap">
                <img loading="lazy" decoding="async"
                  src={getImageUrl(post.primary_image)}
                  alt={post.title}
                  className="bg-img"
                />
                {/* Date badge */}
                <div
                  className={`bg-date-badge ${hovered === post.id ? "bg-date-badge--active" : ""}`}
                >
                  <i className="far fa-calendar-alt"></i>
                  <span>{formatDate(post.created_at)}</span>
                </div>
              </div>

              {/* Info */}
              <div className="bg-info">
                <h3 className="bg-title">{post.title}</h3>
                <div className="bg-meta">
                  <span className="bg-meta-item">
                    <i className="far fa-user"></i>
                    {post.author}
                  </span>
                  <span className="bg-meta-item">
                    <i className="far fa-bookmark"></i>
                    {String(post.minutes_to_read).padStart(2, "0")} min read
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
