import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RegisterPage.css";
import { API_URL } from "../../../config/api";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    setError(null);
    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreed) {
      setError("You must agree to the terms & conditions.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Registration failed");
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="rp-page">
      <div className="rp-card">
        <h1 className="rp-heading">Create A Free Account</h1>

        {/* Username */}
        <div className="rp-field">
          <label className="rp-label">Username*</label>
          <input
            className="rp-input"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="username"
          />
        </div>

        {/* Email */}
        <div className="rp-field">
          <label className="rp-label">Email Address*</label>
          <input
            className="rp-input"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="email"
          />
        </div>

        {/* Password */}
        <div className="rp-field">
          <label className="rp-label">Password</label>
          <input
            className="rp-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="new-password"
          />
        </div>

        {/* Confirm Password */}
        <div className="rp-field">
          <label className="rp-label">Confirm Password</label>
          <input
            className="rp-input"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="new-password"
          />
        </div>

        {/* Terms */}
        <label className="rp-terms">
          <input
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed((v) => !v)}
          />
          I Agree with the{" "}
          <span className="rp-terms-link">terms &amp; conditions</span>
        </label>

        {/* Error */}
        {error && <p className="rp-error">{error}</p>}

        {/* Submit */}
        <button
          className="rp-btn-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating Account..." : "Create Free Account"}
        </button>

        {/* Login link */}
        <p className="rp-login-row">
          Have an Account?{" "}
          <span className="rp-login-link" onClick={() => navigate("/login")}>
            Log In
          </span>
        </p>

        {/* Social */}
        <div className="rp-social-row">
          <span className="rp-social-label">Or login with</span>
          <div className="rp-social-btns">
            <button className="rp-social-btn" title="Google">
              <img loading="lazy" decoding="async"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width="24"
                height="24"
              />
            </button>
            <button className="rp-social-btn" title="Facebook">
              <img loading="lazy" decoding="async"
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                width="24"
                height="24"
              />
            </button>
            <button className="rp-social-btn" title="Apple">
              <i
                className="fab fa-apple"
                style={{ fontSize: "22px", color: "#fff" }}
              ></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
