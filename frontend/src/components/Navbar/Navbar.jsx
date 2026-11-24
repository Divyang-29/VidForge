import { useState, useRef, useEffect, useId } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css";
import { API_URL } from "../../config/api";

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

function DropdownItem({ item }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const trigger = useRef(null);
  const id = useId();

  useEffect(() => {
    const close = (event) => {
      if (!ref.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, []);

  return (
    <li
      className="nav-item nav-dd-wrap"
      ref={ref}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          setOpen(false);
          trigger.current.focus();
        }
      }}
    >
      <button
        type="button"
        ref={trigger}
        className="nav-link-btn"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        {item.label}
        <i aria-hidden="true" className={`fas fa-chevron-down nav-chevron ${open ? "open" : ""}`} />
      </button>

      <ul className="nav-dropdown" id={id} hidden={!open}>
        {item.dropdown.map(({ label, path }) => (
          <li key={path}>
            <Link className="nav-dropdown-item" to={path} onClick={() => setOpen(false)}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

function NavigationLinks({ cartCount }) {
  const [expanded, setExpanded] = useState(false);
  const toggle = useRef(null);

  return (
    <div
      className="nav-inner"
      data-expanded={expanded}
      onClick={(event) => {
        if (event.target.closest("a")) setExpanded(false);
      }}
      onKeyDown={(event) => {
        if (event.key === "Escape" && expanded) {
          setExpanded(false);
          toggle.current.focus();
        }
      }}
    >
      <button
        type="button"
        ref={toggle}
        className="nav-toggle nav-link-btn"
        aria-expanded={expanded}
        aria-controls="primary-nav-left primary-nav-right"
        onClick={() => setExpanded(!expanded)}
      >
        Menu <i className="fas fa-bars" aria-hidden="true" />
      </button>
      <ul className="nav-left" id="primary-nav-left">
        {NAV_LEFT.map((item) => <DropdownItem key={item.label} item={item} />)}
      </ul>

      <Link className="nav-logo" to="/">VidForge</Link>

      <ul className="nav-right" id="primary-nav-right">
        {NAV_RIGHT.map((item) => <DropdownItem key={item.label} item={item} />)}
        <li className="nav-item">
          <Link className="nav-link-btn" to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
          <Link className="cart-icon" to="/cart" aria-label={`Cart, ${cartCount} items`}>
            <i className="fas fa-shopping-bag" aria-hidden="true" />
            <span className="nav-cart-label" aria-hidden="true">Cart</span>
            {cartCount > 0 && (
              <span className="cart-badge" aria-hidden="true">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function Navbar() {
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setCartCount(0);
      return;
    }
    try {
      const res = await fetch(`${API_URL}/cart`, {
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
    <nav className="custom-navbar" aria-label="Main navigation">
      <NavigationLinks key={location.pathname} cartCount={cartCount} />
    </nav>
  );
}
