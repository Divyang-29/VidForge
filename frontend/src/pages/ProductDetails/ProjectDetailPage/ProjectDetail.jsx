import "./ProjectDetail.css";

const PROJECT = {
  title: "The Greate Ocean",
  description1:
    "This phase involves planning and preparation before the actual filming begins. It includes brainstorming ideas, creating scripts, storyboarding, casting actors or presenters, scouting locations, and arranging.",
  description2:
    "This phase involves planning and preparation before the actual filming begins. It includes brainstorming ideas, creating scripts, storyboarding.",
  client: "William Smith",
  author: "Anna Woods",
  startDate: "23 October 2025",
  endDate: "27 October 2025",
  location: "Hilton road, NY/8998, USA",
  heroImage:
    "https://torado.envytheme.com/video-production-movie-release/default/assets/img/portfolio/single-portfolio-1.webp",
  afterHeroText:
    "This phase involves planning and preparation before the actual filming begins. It includes brainstorming ideas, creating storyboarding, casting actors or presenters, scouting locations, and arranging logistics Video production.",
  sectionTitle: "Tesla Brand Book",
  sectionDesc:
    "This phase involves planning and preparation before the actual filming begins. It includes brainstorming ideas, creating scripts, storyboarding, casting actors or presenters, scouting locations, and arranging logistics. Video production services play a crucial role in today's digital landscape, where visual content is a dominant force in engaging audiences and conveying messages effectively.",
  image1:
    "https://torado.envytheme.com/video-production-movie-release/default/assets/img/portfolio/single-portfolio-2.webp",
  image2:
    "https://torado.envytheme.com/video-production-movie-release/default/assets/img/portfolio/single-portfolio-3.webp",
  image3:
    "https://torado.envytheme.com/video-production-movie-release/default/assets/img/portfolio/single-portfolio-4.webp",
  challengeTitle: "Project Challenge",
  challengeDesc:
    "This phase involves planning and preparation before the actual filming begins. It includes brainstorming ideas, creating scripts, storyboarding, casting actors or presenters, scouting locations, and arranging logistics. Video production services play a crucial role in today's digital landscape, where visual content is a dominant force in engaging audiences and conveying messages effectively.",
};

const META = [
  { label: "Client:", value: PROJECT.client },
  { label: "Author:", value: PROJECT.author },
  { label: "Start Date:", value: PROJECT.startDate },
  { label: "End Date:", value: PROJECT.endDate },
  { label: "Location:", value: PROJECT.location },
];

export default function ProjectDetail() {
  return (
    <div className="pd-page">
      <div className="pd-inner mt-5">
        {/* Title */}
        <h1 className="pd-title">{PROJECT.title}</h1>

        {/* Descriptions */}
        <p className="pd-para">{PROJECT.description1}</p>
        <p className="pd-para">{PROJECT.description2}</p>

        {/* Meta table */}
        <div className="pd-meta">
          {META.map((m) => (
            <div key={m.label} className="pd-meta-row">
              <span className="pd-meta-label">{m.label}</span>
              <span className="pd-meta-value">{m.value}</span>
            </div>
          ))}
          <div className="pd-meta-row">
            <span className="pd-meta-label">Share:</span>
            <div className="pd-share-icons">
              <a href="#" className="pd-share-btn">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="pd-share-btn">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="pd-share-btn">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Hero image */}
        <div className="pd-hero-wrap">
          <img src={PROJECT.heroImage} alt="Project" className="pd-hero-img" />
        </div>

        {/* After hero text */}
        <p className="pd-para">{PROJECT.afterHeroText}</p>

        {/* Section: Tesla Brand Book */}
        <h2 className="pd-section-title">{PROJECT.sectionTitle}</h2>
        <p className="pd-para">{PROJECT.sectionDesc}</p>

        {/* Two side-by-side images */}
        <div className="pd-two-imgs">
          <img src={PROJECT.image1} alt="" className="pd-two-img" />
          <img src={PROJECT.image2} alt="" className="pd-two-img" />
        </div>

        {/* Full-width image */}
        <div className="pd-full-img-wrap">
          <img src={PROJECT.image3} alt="" className="pd-full-img" />
        </div>

        {/* Project Challenge */}
        <h2 className="pd-section-title">{PROJECT.challengeTitle}</h2>
        <p className="pd-para">{PROJECT.challengeDesc}</p>
      </div>
    </div>
  );
}
