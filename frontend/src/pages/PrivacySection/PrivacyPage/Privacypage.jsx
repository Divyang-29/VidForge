import { useState, useEffect } from "react";
import "./Privacypage.css";
import { API_URL } from "../../../config/api";

export default function PrivacyPage() {
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/privacy`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to fetch privacy policy");
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

  // Split content into paragraphs and checklist items
  const parseContent = (content = "") => {
    const lines = content.split("\n").filter((l) => l.trim());
    const paras = [];
    const checkItems = [];
    let inChecklist = false;

    lines.forEach((line) => {
      const trimmed = line.trim();
      // detect checklist lines (short bold-like sentences ending with period)
      if (trimmed.endsWith(".") && trimmed.split(" ").length <= 8) {
        inChecklist = true;
        checkItems.push(trimmed);
      } else {
        if (inChecklist) inChecklist = false;
        paras.push(trimmed);
      }
    });

    return { paras, checkItems };
  };

  if (loading)
    return (
      <div className="pp-page">
        <p className="pp-state">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="pp-page">
        <p className="pp-state pp-error">Error: {error}</p>
      </div>
    );

  return (
    <div className="pp-page">
      <div className="pp-inner">
        {sections.map((section, i) => {
          const { paras, checkItems } = parseContent(
            section.content || section.description || "",
          );
          return (
            <div key={section.id || i} className="pp-section">
              {/* Section Title */}
              {section.title && <h2 className="pp-heading">{section.title}</h2>}

              {/* Paragraphs */}
              {paras.map((p, j) => (
                <p
                  key={j}
                  className="pp-para"
                  dangerouslySetInnerHTML={{ __html: p }}
                />
              ))}

              {/* Checklist items */}
              {checkItems.length > 0 && (
                <ul className="pp-checklist">
                  {checkItems.map((item, j) => (
                    <li key={j} className="pp-check-item">
                      <span className="pp-check-icon">
                        <i className="fas fa-check"></i>
                      </span>
                      <span className="pp-check-text">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
