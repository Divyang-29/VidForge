import { useState, useEffect } from "react";
import "./FaqSection.css";

export default function FaqSection() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/faqs")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((d) => {
        const list = Array.isArray(d) ? d : d.faqs || [];
        setFaqs(list);
        // open first item by default
        if (list.length > 0) setOpenId(list[0].id || 0);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  if (loading)
    return (
      <div className="faq-page">
        <p className="faq-state">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="faq-page">
        <p className="faq-state faq-error">Error: {error}</p>
      </div>
    );

  return (
    <div className="faq-page">
      <div className="faq-inner">
        <div className="row g-0 align-items-start">
          {/* ── Left: Accordion ── */}
          <div className="col-12 col-lg-6">
            <div className="faq-list">
              {faqs.map((faq, i) => {
                const id = faq.id ?? i;
                const isOpen = openId === id;
                return (
                  <div
                    key={id}
                    className={`faq-item ${isOpen ? "faq-item--open" : ""}`}
                  >
                    <button className="faq-question" onClick={() => toggle(id)}>
                      <span>{faq.question}</span>
                      <i
                        className={`fas ${isOpen ? "fa-chevron-up" : "fa-chevron-down"} faq-chevron`}
                      ></i>
                    </button>
                    {isOpen && faq.answer && (
                      <div className="faq-answer">
                        <p>{faq.answer}</p>
                      </div>
                    )}
                    <div className="faq-divider" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right: Image ── */}
          <div className="col-12 col-lg-6 d-none d-lg-block">
            <div className="faq-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=700&q=80"
                alt="FAQ"
                className="faq-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
