import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-logo">VIDFORGE</h2>

      <ul className="sidebar-menu">
        <li>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li>
          <Link to="/admin/products">Products</Link>
        </li>
        <li>
          <Link to="/admin/orders">Orders</Link>
        </li>
        <li>
          <Link to="/admin/blogs">Blogs</Link>
        </li>
        <li>
          <Link to="/admin/services">Services</Link>
        </li>
        <li>
          <Link to="/admin/faq">FAQs</Link>
        </li>
        <li>
          <Link to="/admin/privacy">Privacy</Link>
        </li>
        <li>
          <Link to="/admin/members">Members</Link>
        </li>
        <li>
          <Link to="/admin/testimonials">Testimonials</Link>
        </li>
        <li>
          <Link to="/admin/contact">Contacts</Link>
        </li>
        <li>
          <Link to="/admin/review">Reviews</Link>
        </li>
        <li>
          <Link to="/admin/terms">Terms</Link>
        </li>
      </ul>
    </div>
  );
}
