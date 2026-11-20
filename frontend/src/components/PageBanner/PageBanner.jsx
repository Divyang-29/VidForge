import "./PageBanner.css";

/**
 * PageBanner — reusable hero banner
 *
 * Props:
 *  - title       {string}  Page title e.g. "Contact Us"
 *  - breadcrumbs {Array}   e.g. [{ label: "Home", href: "/" }, { label: "Contact Us" }]
 *  - bgImage     {string}  URL of the right-side person/scene image
 */
export default function PageBanner({
  title = "Page Title",
  breadcrumbs = [{ label: "Home", href: "/" }, { label: "Page" }],
  bgImage = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
}) {
  return (
    <div className="pb-banner">
      {/* Left gradient side */}
      <div className="pb-left">
        <div className="pb-text">
          <h1 className="pb-title">{title}</h1>
          <nav className="pb-breadcrumb">
            {breadcrumbs.map((crumb, i) => (
              <span key={i} className="pb-crumb">
                {crumb.href ? (
                  <a href={crumb.href} className="pb-crumb-link">
                    {crumb.label}
                  </a>
                ) : (
                  <span className="pb-crumb-current">{crumb.label}</span>
                )}
                {i < breadcrumbs.length - 1 && (
                  <span className="pb-crumb-sep"> / </span>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Diagonal divider is handled by clip-path in CSS */}
      </div>

      {/* Right image side */}
      <div className="pb-right">
        <img src={bgImage} alt={title} className="pb-image" />
      </div>
    </div>
  );
}
