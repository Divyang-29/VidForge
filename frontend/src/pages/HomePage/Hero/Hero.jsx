import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="container hero-wrapper mb-5">
        <div className="hero-text">
          <h1>
            Video <br />
            Production<span>.</span>
          </h1>

          <p className="hero-desc">
            A Video Production company is a creative agency that specializes in
            creating & producing videos for various purposes.
          </p>

          <div className="hero-star">*</div>
        </div>

        <div className="hero-media">
          <div className="video-card">
            <div className="watch">
              <i className="fa-solid fa-play"></i> Watch Video
            </div>

            <img
              src="https://torado.envytheme.com/video-production-movie-release/default/assets/img/hero/hero-img-1.webp"
              alt="Video production hero banner"
              loading="eager"
              fetchPriority="high"
              decoding="async"
            />
          </div>

          <div className="floating-img">
            <img
              src="https://torado.envytheme.com/video-production-movie-release/default/assets/img/hero/hero-img-3.webp"
              alt="Video production creative showcase"
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="orange-box">
            <span>A</span>
          </div>
        </div>
      </div>
    </section>
  );
}
