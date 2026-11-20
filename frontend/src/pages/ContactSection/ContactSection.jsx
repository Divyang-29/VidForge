import { useState } from "react";
import "./ContactSection.css";
import { API_URL } from "../../config/api";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    website: "",
    message: "",
  });
  const [status, setStatus] = useState(null); // null | "loading" | "success" | "error"

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setStatus("loading");
    try {
      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Server error");
      setStatus("success");
      setFormData({ name: "", email: "", phone: "", website: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="cs-page">
      <div className="cs-inner">
        {/* ── Left Info ── */}
        <div className="cs-left">
          <h2 className="cs-heading">
            Contact With Us
            <br />
            For Help
          </h2>
          <p className="cs-desc">
            Drop your contact details into the form, and we'll reach out to you!
            Trusted financial consulting firm providing expert guidance
            personalized.
          </p>
          <ul className="cs-info-list">
            <li>
              <i className="fas fa-comment-dots cs-info-icon"></i>
              <span>hello@torado.com</span>
            </li>
            <li>
              <i className="fas fa-calendar cs-info-icon"></i>
              <span>Mon-Fri (07:00AM–07PM)</span>
            </li>
            <li>
              <i className="fas fa-phone cs-info-icon"></i>
              <span>+48 93939 0239</span>
            </li>
          </ul>
        </div>

        {/* ── Right Form ── */}
        <div className="cs-right">
          <h3 className="cs-form-title">Send Your Message</h3>

          <div className="cs-row">
            <input
              className="cs-input"
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              className="cs-input"
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="cs-row">
            <input
              className="cs-input"
              type="text"
              name="phone"
              placeholder="Your phone number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              className="cs-input"
              type="text"
              name="website"
              placeholder="Your website (optional)"
              value={formData.website}
              onChange={handleChange}
            />
          </div>

          <textarea
            className="cs-input cs-textarea"
            name="message"
            placeholder="Tell us more about your needs!..."
            value={formData.message}
            onChange={handleChange}
          />

          {status === "success" && (
            <p className="cs-feedback cs-success">
              <i className="fas fa-check-circle"></i> Message sent successfully!
            </p>
          )}
          {status === "error" && (
            <p className="cs-feedback cs-error">
              <i className="fas fa-exclamation-circle"></i> Something went
              wrong. Please try again.
            </p>
          )}

          <button
            className="cs-submit"
            onClick={handleSubmit}
            disabled={status === "loading"}
          >
            {status === "loading" ? "Sending..." : "Submit Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
