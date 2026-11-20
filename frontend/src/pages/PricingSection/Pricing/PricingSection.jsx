import { useState, useEffect } from "react";
import "./PricingSection.css";

export default function PricingSection() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/pricing")
      .then((r) => {
        if (!r.ok) throw new Error("Failed");
        return r.json();
      })
      .then((d) => {
        // Sort: Standard, Basic, Premium
        const order = ["Standard Plan", "Basic Plan", "Premium Plan"];
        const sorted = [...d].sort(
          (a, b) => order.indexOf(a.plan_name) - order.indexOf(b.plan_name),
        );
        setPlans(sorted);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const getImg = (f) => `http://localhost:8080/uploads/${f}`;

  // Middle card (index 1) is featured
  const isFeatured = (i) => i === 1;

  if (loading)
    return (
      <div className="pc-page">
        <p className="pc-state">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="pc-page">
        <p className="pc-state pc-error">Error: {error}</p>
      </div>
    );

  return (
    <div className="pc-page">
      <div className="row g-4 mx-0 p-5">
        {plans.map((plan, i) => (
          <div className="col-12 col-md-4" key={plan.id}>
            <div
              className={`pc-card ${isFeatured(i) ? "pc-card--featured" : ""}`}
            >
              {/* Top: icon (featured only) + image */}
              <div className="pc-top-row">
                {isFeatured(i) && (
                  <div className="pc-box-icon">
                    {/* 3D box SVG */}
                    <svg
                      width="52"
                      height="52"
                      viewBox="0 0 52 52"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M26 4L46 15V37L26 48L6 37V15L26 4Z"
                        stroke="white"
                        strokeWidth="2"
                        fill="none"
                      />
                      <path d="M26 4L26 48" stroke="white" strokeWidth="2" />
                      <path d="M6 15L46 15" stroke="white" strokeWidth="2" />
                      <path
                        d="M6 15L26 26L46 15"
                        stroke="white"
                        strokeWidth="2"
                      />
                      <path d="M26 26L26 48" stroke="white" strokeWidth="2" />
                    </svg>
                  </div>
                )}
                <div
                  className={`pc-img-wrap ${isFeatured(i) ? "pc-img-wrap--right" : ""}`}
                >
                  <img
                    src={getImg(plan.image)}
                    alt={plan.plan_name}
                    className="pc-img"
                  />
                </div>
              </div>

              {/* Plan name */}
              <p className="pc-plan-name">{plan.plan_name}</p>

              {/* Price */}
              <div className="pc-price-row">
                <span className="pc-dollar">$</span>
                <span className="pc-amount">{parseInt(plan.price)}</span>
                <span className="pc-duration">/{plan.duration}</span>
              </div>

              {/* Features */}
              <ul className="pc-features">
                {(plan.features || []).map((feat, j) => (
                  <li key={j} className="pc-feature-item">
                    <i className="fas fa-check pc-check"></i>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button
                className={`pc-btn ${isFeatured(i) ? "pc-btn--active" : "pc-btn--muted"}`}
              >
                Get Started Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
