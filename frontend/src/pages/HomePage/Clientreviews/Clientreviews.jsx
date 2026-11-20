import { useState, useEffect } from "react";
import "./ClientReviews.css";
import { API_URL } from "../../../config/api";

export default function ClientReviews() {
  const [reviews, setReviews] = useState([]);
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/reviews`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reviews");
        return res.json();
      })
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const prev = () =>
    setActive((a) => (a - 1 + reviews.length) % reviews.length);
  const next = () => setActive((a) => (a + 1) % reviews.length);

  const getImageUrl = (filename) => `${API_URL}/uploads/${filename}`;

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < rating ? "star active" : "star"}>
        ★
      </span>
    ));

  if (loading)
    return (
      <div className="cr-page">
        <p className="cr-loading">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="cr-page">
        <p className="cr-error">Error: {error}</p>
      </div>
    );
  if (!reviews.length)
    return (
      <div className="cr-page">
        <p className="cr-loading">No reviews found.</p>
      </div>
    );

  const current = reviews[active];

  // pick up to 3 images for the collage: active + next two
  const collageIndices = [0, 1, 2].map(
    (offset) => (active + offset) % reviews.length,
  );

  return (
    <div className="cr-page">
      {/* Top Bar */}
      <div className="cr-topbar">
        <h1 className="cr-title">CLIENT REVIEW'S</h1>
        <div className="cr-topbar-right">
          <span className="cr-label">Customer Review's</span>
          <div className="cr-top-nav">
            <button className="cr-nav-btn" onClick={prev}>
              <i className="fas fa-arrow-left"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="cr-body">
        {/* Collage */}
        <div className="cr-collage">
          <div className="cr-collage-top">
            <img loading="lazy" decoding="async"
              key={`main-${active}`}
              src={getImageUrl(reviews[collageIndices[0]].image)}
              alt={reviews[collageIndices[0]].name}
              className="cr-img cr-img-main fade-in"
            />
          </div>
          <div className="cr-collage-bottom">
            <img loading="lazy" decoding="async"
              key={`s1-${active}`}
              src={getImageUrl(
                reviews[
                  collageIndices[1] !== undefined
                    ? collageIndices[1]
                    : collageIndices[0]
                ].image,
              )}
              alt=""
              className="cr-img cr-img-small fade-in"
            />
            <img loading="lazy" decoding="async"
              key={`s2-${active}`}
              src={getImageUrl(
                reviews[
                  collageIndices[2] !== undefined
                    ? collageIndices[2]
                    : collageIndices[0]
                ].image,
              )}
              alt=""
              className="cr-img cr-img-small fade-in"
            />
          </div>
        </div>

        {/* Review Content */}
        <div className="cr-content" key={active}>
          <div className="cr-stars">{renderStars(current.rating)}</div>
          <p className="cr-quote">"{current.review}"</p>
          <div className="cr-author">
            <span className="cr-name">{current.name}</span>
            <i className="fas fa-quote-right cr-quote-icon"></i>
          </div>
          <p className="cr-position">{current.position}</p>
        </div>

        {/* Bottom Nav */}
        <div className="cr-bottom-nav">
          <button className="cr-nav-btn" onClick={prev}>
            <i className="fas fa-arrow-left"></i>
          </button>
          <button className="cr-nav-btn" onClick={next}>
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
