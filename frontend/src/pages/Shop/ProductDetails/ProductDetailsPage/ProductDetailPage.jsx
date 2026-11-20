import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetailPage.css";

const API_BASE = "http://localhost:8080";
const IMAGE_BASE = `${API_BASE}/uploads/`;

// ── Star renderer ──
function Stars({ rating = 0, max = 5 }) {
  return (
    <div className="pdp-stars">
      {Array.from({ length: max }, (_, i) => {
        const filled = i < Math.round(rating);
        return (
          <svg key={i} viewBox="0 0 20 20" fill={filled ? "#e8530a" : "#333"}>
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      })}
    </div>
  );
}

// ── Heart icon ──
function HeartIcon({ filled }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeImage, setActiveImage] = useState(null);
  const [qty, setQty] = useState(1);
  const [wished, setWished] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [toast, setToast] = useState(null);
  const [addingCart, setAddingCart] = useState(false);

  // Fetch product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
        setActiveImage(data.primary_image);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }
    setAddingCart(true);
    try {
      const res = await fetch(`${API_BASE}/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ product_id: product.id, quantity: qty }),
      });
      if (!res.ok) {
        const d = await res.json();
        throw new Error(d?.message || "Failed to add to cart");
      }
      showToast("Added to cart!");
    } catch (err) {
      showToast(err.message);
    } finally {
      setAddingCart(false);
    }
  };

  const discount = product
    ? Math.round(
        ((parseFloat(product.price) - parseFloat(product.discounted_price)) /
          parseFloat(product.price)) *
          100,
      )
    : 0;

  const deliveryDate = product?.expected_delivery_date
    ? new Date(product.expected_delivery_date).toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : null;

  const allImages = product
    ? [product.primary_image, ...(product.images || [])].filter(Boolean)
    : [];

  if (loading)
    return (
      <div className="pdp-loader">
        <div className="pdp-spinner" />
        Loading product...
      </div>
    );

  if (error) return <div className="pdp-error-msg">Error: {error}</div>;

  return (
    <div className="pdp-page">
      {/* Breadcrumb */}
      <div className="pdp-breadcrumb">
        <span onClick={() => navigate("/")}>Home</span>
        <span className="sep">›</span>
        <span onClick={() => navigate("/shop")}>Shop</span>
        <span className="sep">›</span>
        <span>{product.category}</span>
        <span className="sep">›</span>
        <span className="current">{product.title}</span>
      </div>

      {/* Main grid */}
      <div className="pdp-main">
        {/* ── LEFT: Images ── */}
        <div className="pdp-images">
          {activeImage ? (
            <img
              className="pdp-primary-img"
              src={`${IMAGE_BASE}${activeImage}`}
              alt={product.title}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling &&
                  (e.target.nextSibling.style.display = "flex");
              }}
            />
          ) : (
            <div className="pdp-img-placeholder">No image available</div>
          )}

          {allImages.length > 1 && (
            <div className="pdp-thumbs">
              {allImages.map((img, idx) => (
                <img
                  key={idx}
                  className={`pdp-thumb ${activeImage === img ? "active" : ""}`}
                  src={`${IMAGE_BASE}${img}`}
                  alt={`thumb-${idx}`}
                  onClick={() => setActiveImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── RIGHT: Info ── */}
        <div className="pdp-info">
          {/* Rating */}
          <div className="pdp-rating">
            <Stars rating={4} />
            <span className="pdp-review-count">(02) Reviews</span>
          </div>

          {/* Title */}
          <h1 className="pdp-title">{product.title}</h1>

          {/* Price */}
          <div className="pdp-price-row">
            <span className="pdp-price">
              ${parseFloat(product.discounted_price).toFixed(2)}
            </span>
            {product.price !== product.discounted_price && (
              <span className="pdp-price-original">
                ${parseFloat(product.price).toFixed(2)}
              </span>
            )}
            {discount > 0 && <span className="pdp-badge">{discount}% OFF</span>}
          </div>

          {/* Description */}
          <p className="pdp-description">{product.description}</p>

          {/* Stock */}
          <p className={`pdp-stock ${product.stock <= 3 ? "low" : ""}`}>
            Availability:{" "}
            <strong>
              {product.stock > 0
                ? product.stock <= 3
                  ? `Only ${product.stock} left!`
                  : "In Stock"
                : "Out of Stock"}
            </strong>
          </p>

          {/* Actions */}
          <div className="pdp-actions">
            <div className="pdp-qty">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))}>
                −
              </button>
              <span className="pdp-qty-val">{qty}</span>
              <button
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              >
                +
              </button>
            </div>
            <button
              className="pdp-btn-cart"
              onClick={handleAddToCart}
              disabled={addingCart || product.stock === 0}
            >
              {addingCart ? "Adding..." : "Add To Cart"}
            </button>
            <button
              className={`pdp-btn-wish ${wished ? "active" : ""}`}
              onClick={() => setWished((w) => !w)}
              title="Wishlist"
            >
              <HeartIcon filled={wished} />
            </button>
          </div>

          {/* Meta */}
          <div className="pdp-meta">
            <div className="pdp-meta-row">
              <span className="pdp-meta-label">SKU :</span>
              <span className="pdp-meta-value">{product.sku}</span>
            </div>
            <div className="pdp-meta-row">
              <span className="pdp-meta-label">Category :</span>
              <span className="pdp-meta-value">
                {product.sub_category || product.category}
              </span>
            </div>
            {product.tags?.length > 0 && (
              <div className="pdp-meta-row">
                <span className="pdp-meta-label">Tag :</span>
                <div className="pdp-tags">
                  {product.tags.map((tag) => (
                    <span key={tag} className="pdp-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="pdp-meta-row">
              <span className="pdp-meta-label">Product ID :</span>
              <span className="pdp-meta-value">
                {product.id.split("-")[0].toUpperCase()}
              </span>
            </div>
          </div>

          {/* Delivery */}
          {deliveryDate && (
            <div className="pdp-delivery">
              Estimated delivery by <span>{deliveryDate}</span>
            </div>
          )}
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="pdp-tabs-section">
        <div className="pdp-tabs-nav">
          {[
            { key: "info", label: "Product Information" },
            { key: "additional", label: "Additional Information" },
            { key: "reviews", label: "Reviews" },
          ].map((tab) => (
            <button
              key={tab.key}
              className={`pdp-tab-btn ${activeTab === tab.key ? "active" : ""}`}
              onClick={() => setActiveTab(tab.key)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="pdp-tab-content">
          {activeTab === "info" && <p>{product.description}</p>}

          {activeTab === "additional" && (
            <div className="pdp-additional-grid">
              {Object.entries(product.additional_info || {}).map(([k, v]) => (
                <div key={k} className="pdp-additional-item">
                  <span className="pdp-additional-key">
                    {k.replace(/_/g, " ")}
                  </span>
                  <span className="pdp-additional-val">{String(v)}</span>
                </div>
              ))}
              <div className="pdp-additional-item">
                <span className="pdp-additional-key">Category</span>
                <span className="pdp-additional-val">{product.category}</span>
              </div>
              <div className="pdp-additional-item">
                <span className="pdp-additional-key">Stock</span>
                <span className="pdp-additional-val">
                  {product.stock} units
                </span>
              </div>
            </div>
          )}

          {activeTab === "reviews" && (
            <p style={{ color: "var(--text-muted)" }}>No reviews yet.</p>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && <div className="pdp-toast">{toast}</div>}
    </div>
  );
}
