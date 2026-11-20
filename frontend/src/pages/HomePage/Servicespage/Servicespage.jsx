import { useState } from "react";
import "./ServicesPage.css";

const services = [
  {
    id: 1,
    label: "Live Streaming ",
    image:
      "https://torado.envytheme.com/video-production-movie-release/default/assets/img/services/service-1.webp",
  },
  {
    id: 2,
    label: "3D Visualization",
    image:
      "https://torado.envytheme.com/video-production-movie-release/default/assets/img/services/service-2.webp",
  },
  {
    id: 3,
    label: "Graphics & Animation",
    image:
      "https://torado.envytheme.com/video-production-movie-release/default/assets/img/services/service-3.webp",
  },
  {
    id: 4,
    label: "HD Visualization",
    image:
      "https://torado.envytheme.com/video-production-movie-release/default/assets/img/services/service-4.webp",
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(1);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="page">
      {/* Header */}
      <div className="header">
        <span className="header-dim">What We Do</span>
        <span className="header-dot"> • </span>
        <span className="header-bright">Our Services</span>
      </div>

      {/* Body */}
      <div className="body">
        {/* Service List */}
        <div className="list">
          {services.map((svc, i) => {
            const isActive = activeService === svc.id;
            return (
              <div key={svc.id}>
                <div
                  className="service-row"
                  onClick={() => setActiveService(svc.id)}
                  onMouseEnter={() => setHovered(svc.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <span className={`service-label ${isActive ? "active" : ""}`}>
                    {svc.label}
                  </span>
                  {isActive && (
                    <span className="arrow-icon">
                      <i class="fa-solid fa-square-arrow-up-right"></i>
                    </span>
                  )}
                </div>
                {i < services.length - 1 && <div className="divider" />}
              </div>
            );
          })}
        </div>

        {/* Image Panel */}
        <div className="image-panel">
          <img
            key={activeService}
            src={services.find((s) => s.id === activeService)?.image}
            alt="Service preview"
            className="service-image"
          />
        </div>
      </div>

      {/* Scroll Up FAB */}
      <button
        className="fab"
        title="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fas fa-arrow-up"></i>
      </button>
    </div>
  );
}
