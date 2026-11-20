import "./ExploreSection.css";

export default function ExploreSection() {
  return (
    <section className="explore">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT CONTENT */}

          <div className="col-lg-6">
            <p className="explore-text">
              This phase involves planning and preparation before the actual
              filming begins. It includes brainstorming ideas, creating scripts,
              storyboarding, casting actors or presenters, scouting locations,
              and arranging logistics.
            </p>

            <div className="explore-btn">
              <div className="circle">Explore More</div>

              <div className="line"></div>

              <div className="arrow">→</div>
            </div>
          </div>

          {/* RIGHT IMAGE */}

          <div className="col-lg-6">
            <div className="explore-image">
              <img loading="lazy" decoding="async"
                src="https://torado.envytheme.com/video-production-movie-release/default/assets/img/about/about-img-1.webp"
                alt="studio"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
