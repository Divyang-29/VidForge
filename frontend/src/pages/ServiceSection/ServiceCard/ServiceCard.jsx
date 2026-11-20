import { useState, useEffect } from "react";
import "./ServiceCards.css";
import { API_URL } from "../../../config/api";

export default function ServiceCards() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/services`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((d) => {
        setServices(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const getImgUrl = (f) => `${API_URL}/uploads/${f}`;

  if (loading)
    return (
      <div className="sv-page">
        <p className="sv-state">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="sv-page">
        <p className="sv-state sv-error">Error: {error}</p>
      </div>
    );

  return (
    <div className="sv-page">
      <div className="row g-0 mx-0 p-5">
        {services.map((svc, i) => (
          <div className="col-12 col-md-4" key={svc.id}>
            <div className="sv-card">
              {/* Icon + Number */}
              <div className="sv-top-row">
                <div className="sv-icon-wrap">
                  {svc.primary_image?.endsWith(".svg") ? (
                    <img loading="lazy" decoding="async"
                      src={getImgUrl(svc.primary_image)}
                      alt={svc.title}
                      className="sv-icon-img"
                    />
                  ) : (
                    <i className="fas fa-film sv-icon-fa"></i>
                  )}
                </div>
                <span className="sv-number">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Title */}
              <h3 className="sv-title">{svc.title}</h3>

              {/* Divider */}
              <div className="sv-divider" />

              {/* Description */}
              <p className="sv-desc">{svc.description}</p>

              {/* Bullets */}
              {Array.isArray(svc.bullets) && svc.bullets.length > 0 && (
                <ul className="sv-bullets">
                  {svc.bullets.map((b, j) => (
                    <li key={j} className="sv-bullet-item">
                      <span className="sv-dot"></span>
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
