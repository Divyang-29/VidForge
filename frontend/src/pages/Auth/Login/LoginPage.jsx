import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { API_URL } from "../../../config/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ identifier: "", password: "" });
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleLogin = async () => {
    setError(null);
    if (!form.identifier || !form.password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          identifier: form.identifier,
          password: form.password,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Login failed");
      if (data.token) localStorage.setItem("token", data.token);
      if (data.user?.role) localStorage.setItem("role", data.user.role);
      if (data.user?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="lp-page">
      <div className="lp-card">
        <h1 className="lp-heading">Log In Now</h1>

        {/* Username/Email */}
        <div className="lp-field">
          <label className="lp-label">Username/Email</label>
          <input
            className="lp-input"
            type="text"
            name="identifier"
            value={form.identifier}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="username"
          />
        </div>

        {/* Password */}
        <div className="lp-field">
          <label className="lp-label">Password</label>
          <input
            className="lp-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="current-password"
          />
        </div>

        {/* Remember + Forgot */}
        <div className="lp-row-mid">
          <label className="lp-remember">
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember((v) => !v)}
            />
            Remember Me
          </label>
          <span
            className="lp-forgot"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>

        {/* Error */}
        {error && <p className="lp-error">{error}</p>}

        {/* Login Button */}
        <button
          className="lp-btn-login"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Log In"}
        </button>

        {/* Sign Up link */}
        <p className="lp-signup-row">
          Don't Have an Account?{" "}
          <span
            className="lp-signup-link"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </span>
        </p>

        {/* Social Login */}
        <div className="lp-social-row">
          <span className="lp-social-label">Or Sign Up with</span>
          <div className="lp-social-btns">
            <button className="lp-social-btn" title="Google">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="Google"
                width="24"
                height="24"
              />
            </button>
            <button className="lp-social-btn" title="Facebook">
              <img
                src="https://www.svgrepo.com/show/475647/facebook-color.svg"
                alt="Facebook"
                width="24"
                height="24"
              />
            </button>
            <button className="lp-social-btn" title="Apple">
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
