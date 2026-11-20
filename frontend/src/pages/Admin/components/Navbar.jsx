import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="admin-navbar">
      <h4>Admin Dashboard</h4>

      <button className="logout-btn" onClick={() => navigate("/")}>
        Logout
      </button>
    </div>
  );
}
