import { useState, useEffect } from "react";
import "./TermPage.css";
import { API_URL } from "../../../config/api";

export default function TermsPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/terms`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch terms");
        return r.json();
      })
      .then((d) => {
        setSections(Array.isArray(d) ? d : [d]);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  if (loading)
    return (
      <div className="tp-page">
        <p className="tp-state">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="tp-page">
        <p className="tp-state tp-error">Error: {error}</p>
      </div>
    );

  return (
    <div className="tp-page">
      <div className="tp-inner">
        {sections.map((section, i) => (
          <div key={section.id || i} className="tp-section">
            {section.title && <h2 className="tp-heading">{section.title}</h2>}

            {section.content && (
              <p
                className="tp-para"
                dangerouslySetInnerHTML={{ __html: section.content }}
              />
            )}

            {section.description && (
              <p
                className="tp-para"
                dangerouslySetInnerHTML={{ __html: section.description }}
              />
            )}

            {Array.isArray(section.items) && section.items.length > 0 && (
              <ol className="tp-list">
                {section.items.map((item, j) => (
                  <li key={j} className="tp-list-item">
                    {item}
                  </li>
                ))}
              </ol>
            )}

            {Array.isArray(section.points) && section.points.length > 0 && (
              <ol className="tp-list">
                {section.points.map((point, j) => (
                  <li key={j} className="tp-list-item">
                    {point}
                  </li>
                ))}
              </ol>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
