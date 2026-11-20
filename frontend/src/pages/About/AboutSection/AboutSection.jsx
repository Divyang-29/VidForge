import "./AboutSection.css";

export default function AboutSection() {
  return (
    <div className="as-page">
      <div className="as-inner">
        {/* ── Top Row: label + title + explore ── */}
        <div className="as-top-row">
          <div className="as-title-block">
            <span className="as-label">About Our Story</span>
            <h1 className="as-title">About Us</h1>
          </div>
          <div className="as-explore">
            <span className="as-explore-text">Explore More</span>
            <div className="as-explore-line">
              <div className="as-explore-circle"></div>
              <div className="as-explore-arrow">&#8594;</div>
            </div>
          </div>
        </div>

        {/* ── Middle: stat left + image center + stat right ── */}
        <div className="as-mid-row">
          {/* Left stat — hidden here, shown below */}
          <div className="as-stat as-stat-left">
            {/* empty slot to balance layout */}
          </div>

          {/* Center image */}
          <div className="as-img-wrap">
            <img loading="lazy" decoding="async"
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="About Us"
              className="as-img"
            />
          </div>

          {/* Right stat */}
          <div className="as-stat as-stat-right">
            <span className="as-stat-num">124+</span>
            <span className="as-stat-label">We Are Winning Awards</span>
          </div>
        </div>

        {/* ── Bottom Row: stat left + description right ── */}
        <div className="as-bottom-row">
          <div className="as-stat as-stat-bottom-left">
            <span className="as-stat-num">785+</span>
            <span className="as-stat-label">Projects Completed Now</span>
          </div>

          <div className="as-desc-block">
            <p className="as-desc">
              These companies offer a range of services, including
              conceptualization, scripting, shooting, editing, and post
              production, with the aim of delivering high quality visual content
              to meet the specific needs of their clients.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
