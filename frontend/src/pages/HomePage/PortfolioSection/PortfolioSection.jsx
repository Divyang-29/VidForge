import "./PortfolioSection.css";

export default function PortfolioSection() {
  return (
    <section className="portfolio">
      <div className="container">
        {/* heading */}

        <div className="portfolio-heading">
          <h2>
            <span className="light">What We Done</span>
            <span className="dot"> • </span>
            <span>Our Portfolio</span>
          </h2>
        </div>

        {/* gallery */}

        <div className="portfolio-grid">
          <div className="portfolio-item">
            <img
              src="https://torado.envytheme.com/video-production-movie-release/default/assets/img/portfolio/portfolio-2.webp"
              alt=""
            />

            <div className="watch">
              <span className="play">▶</span>
              Watch Video
            </div>
          </div>

          <div className="portfolio-item large">
            <img
              src="https://torado.envytheme.com/video-production-movie-release/default/assets/img/portfolio/portfolio-1.webp"
              alt=""
            />

            <div className="watch">
              <span className="play">▶</span>
              Watch Video
            </div>
          </div>

          <div className="portfolio-item">
            <img
              src="https://torado.envytheme.com/video-production-movie-release/default/assets/img/portfolio/portfolio-3.webp"
              alt=""
            />

            <div className="watch">
              <span className="play">▶</span>
              Watch Video
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
