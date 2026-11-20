import "./VideoStatsSection.css";

export default function VideoStatsSection() {
  return (
    <section className="video-stats">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT IMAGE */}

          <div className="col-lg-6">
            <div className="video-box">
              <img loading="lazy" decoding="async"
                src="https://i.pinimg.com/736x/23/2c/69/232c696cebb0a9544505f1fcddc3e190.jpg"
                alt="team"
              />

              <div className="watch-video">
                Watch Video
                <span className="play-icon">▶</span>
              </div>
            </div>
          </div>

          {/* RIGHT CONTENT */}

          <div className="col-lg-6">
            <div className="video-content">
              <p className="video-text">
                Video production companies work businesses, organizations,
                individuals, artists, & brands to create high-quality videos
                that effectively convey messages.
              </p>

              <div className="stats">
                <div className="stat">
                  <h2>785+</h2>
                  <p>Our Completed Project</p>
                </div>

                <div className="stat">
                  <h2>124+</h2>
                  <p>We are winning awards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
