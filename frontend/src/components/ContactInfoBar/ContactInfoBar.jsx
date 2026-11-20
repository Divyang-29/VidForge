import "./ContactInfoBar.css";

export default function ContactInfoBar() {
  return (
    <div className="cib-wrapper">
      <div className="cib-bar">
        <div className="cib-item">
          <i className="fas fa-phone-alt cib-icon"></i>
          <div className="cib-text">
            <span className="cib-label">Call us anytime</span>
            <span className="cib-value">+583 8838 929</span>
          </div>
        </div>

        <div className="cib-divider"></div>

        <div className="cib-item">
          <i className="fas fa-comment-alt cib-icon"></i>
          <div className="cib-text">
            <span className="cib-label">Send Message</span>
            <span className="cib-value">hello@torado.com</span>
          </div>
        </div>

        <div className="cib-divider"></div>

        <div className="cib-item">
          <i className="fas fa-map-marker-alt cib-icon"></i>
          <div className="cib-text">
            <span className="cib-label">Our Location</span>
            <span className="cib-value">23/TY Akalisa, Australia</span>
          </div>
        </div>
      </div>
    </div>
  );
}
