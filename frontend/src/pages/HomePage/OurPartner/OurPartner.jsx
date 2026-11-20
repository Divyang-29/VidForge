import "./OurPartner.css";

const partners = [
  {
    id: 1,
    icon: "fas fa-th-large",
    name: "THE SQUARE",
    sub: "",
  },
  {
    id: 2,
    icon: "fas fa-th",
    name: "MINIMAL BRAND",
    sub: "",
  },
  {
    id: 3,
    icon: "fas fa-camera",
    name: "PHOTO MINIMAL",
    sub: "INDUSTRY CO.",
  },
  {
    id: 4,
    icon: "fas fa-bicycle",
    name: "MINIMAL",
    sub: "BIKE STORE",
  },
  {
    id: 5,
    icon: null,
    initials: "DS",
    name: "DESIGN STUDIO",
    sub: "",
  },
  {
    id: 6,
    icon: "fas fa-bookmark",
    name: "MINIMAL",
    sub: "ORIGINAL GENUINE QUALITY",
  },
  {
    id: 7,
    icon: "fas fa-flask",
    name: "THE DESIGN STUDIO",
    sub: "",
  },
  {
    id: 8,
    icon: "fas fa-project-diagram",
    name: "CONNECTION",
    sub: "INDUSTRY CO.",
  },
  {
    id: 9,
    icon: null,
    name: "MINIMAL",
    sub: "INDUSTRY CO.",
    topLine: true,
  },
];

export default function OurPartner() {
  return (
    <div className="op-page">
      {/* Left Title */}
      <div className="op-left">
        <h2 className="op-title">OUR PARTNER</h2>
      </div>

      {/* Right Grid */}
      <div className="op-grid">
        {partners.map((p) => (
          <div className="op-card" key={p.id}>
            {p.topLine && <div className="op-topline" />}
            <div className="op-card-inner">
              {p.initials ? (
                <div className="op-initials-circle">{p.initials}</div>
              ) : p.icon ? (
                <i className={`${p.icon} op-icon`}></i>
              ) : null}
              <div className="op-text">
                {p.sub && p.id === 9 && (
                  <span className="op-sub op-sub-top">{p.sub}</span>
                )}
                <span className="op-name">{p.name}</span>
                {p.sub && p.id !== 9 && <span className="op-sub">{p.sub}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
