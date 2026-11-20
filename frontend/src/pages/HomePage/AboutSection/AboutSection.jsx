import "./AboutSection.css";

export default function AboutSection() {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-left">
          <div className="arrow-box">
            <span>About Us</span>
            <div className="arrow"></div>
          </div>
        </div>

        <div className="about-right">
          <p>
            These companies offer a range of services, including
            conceptualization, scripting, shooting, editing, and post
            production, with the aim of delivering high-quality visual content
            to meet the specific needs of their clients.
          </p>
        </div>
      </div>
    </section>
  );
}
