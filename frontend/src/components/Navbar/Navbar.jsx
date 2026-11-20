import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

const NAV_LEFT = [
  {
    label: "Home",
    dropdown: [
      { label: "Home", path: "/" },
      { label: "About Us", path: "/about" },
    ],
  },
  {
    label: "About Us",
    dropdown: [
      { label: "Faqs", path: "/faqs" },
      { label: "Privacy Policy", path: "/privacy-policy" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Services", path: "/service" },
      { label: "Pricing", path: "/pricing" },
    ],
  },
  {
    label: "Our Work",
    dropdown: [
      { label: "Portfolio", path: "/portfolio" },
      { label: "Project Details", path: "/project" },
    ],
  },
];

const NAV_RIGHT = [
  {
    label: "Blog",
    dropdown: [
      { label: "All Posts", path: "/blog" },
      { label: "Latest", path: "/blog/latest" },
    ],
  },
  {
    label: "Shop",
    dropdown: [
      { label: "Shop Grid", path: "/shop" },
      { label: "Cart", path: "/cart" },
      { label: "Wishlist", path: "/wishlist" },
      { label: "Checkout", path: "/checkout" },
      { label: "Register", path: "/register" },
      { label: "Login", path: "/login" },
    ],
  },
];

function DropdownItem({ item, navigate }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const close = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  return (
    <li className="nav-item nav-dd-wrap" ref={ref}>
      <span
        className="nav-link-btn"
        onClick={() =>
          item.dropdown ? setOpen((v) => !v) : navigate(item.path)
        }
      >
        {item.label}
        {item.dropdown && (
          <i
            className={`fas fa-chevron-down nav-chevron ${open ? "open" : ""}`}
          ></i>
        )}
      </span>

      {item.dropdown && open && (
        <ul className="nav-dropdown">
          {item.dropdown.map((d, i) => (
            <li
              key={i}
              className="nav-dropdown-item"
              onClick={() => {
                navigate(d.path);
                setOpen(false);
              }}
            >
              {d.label}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const res = await fetch("http://localhost:8080/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        setCartCount(0);
        return;
      }
      const data = await res.json();
      // data is an array of cart items — sum up quantities
      const total = Array.isArray(data)
        ? data.reduce((sum, item) => sum + (item.quantity || 1), 0)
        : 0;
      setCartCount(total);
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Re-fetch whenever user logs in/out (token changes in storage)
    const handleStorage = () => fetchCartCount();
    window.addEventListener("storage", handleStorage);

    // Re-fetch on custom "cartUpdated" event (fire this from Add To Cart)
    const handleCartUpdate = () => fetchCartCount();
    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("storage", handleStorage);
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  return (
    <nav className="custom-navbar">
      <div className="nav-inner">
        {/* LEFT */}
        <ul className="nav-left">
          {NAV_LEFT.map((item, i) => (
            <DropdownItem key={i} item={item} navigate={navigate} />
          ))}
        </ul>

        {/* LOGO */}
        <div className="nav-logo" onClick={() => navigate("/")}>
          VidForge
        </div>

        {/* RIGHT */}
        <ul className="nav-right">
          {NAV_RIGHT.map((item, i) => (
            <DropdownItem key={i} item={item} navigate={navigate} />
          ))}
          <li className="nav-item" onClick={() => navigate("/contact")}>
            Contact
          </li>
          <li className="cart-icon" onClick={() => navigate("/cart")}>
            <i className="fas fa-shopping-bag"></i>
            {cartCount > 0 && (
              <span className="cart-badge">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
