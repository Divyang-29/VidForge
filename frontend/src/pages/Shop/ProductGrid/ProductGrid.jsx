import { useState, useEffect } from "react";
import "./ProductGrid.css";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../../../config/api";

const SORT_OPTIONS = [
  { value: "latest", label: "Sort by latest" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
  { value: "name", label: "Name: A to Z" },
];

function StarRating({ rating = 4.5 }) {
  return (
    <div className="d-flex gap-1 pg-stars">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = rating >= star;
        const half = !filled && rating >= star - 0.5;
        return (
          <i
            key={star}
            className={`fas ${half ? "fa-star-half-alt" : "fa-star"}`}
            style={{
              color: "#f59e0b",
              opacity: filled || half ? 1 : 0.25,
              fontSize: "14px",
            }}
          />
        );
      })}
    </div>
  );
}

export default function ProductGrid() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState("latest");

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const getImageUrl = (filename) => `${API_URL}/uploads/${filename}`;

  const sorted = [...products].sort((a, b) => {
    if (sort === "price_asc") return parseFloat(a.price) - parseFloat(b.price);
    if (sort === "price_desc") return parseFloat(b.price) - parseFloat(a.price);
    if (sort === "name") return a.title.localeCompare(b.title);
    return new Date(b.created_at) - new Date(a.created_at);
  });

  if (loading)
    return (
      <div className="bg-black text-secondary py-5 text-center">Loading...</div>
    );
  if (error)
    return (
      <div className="bg-black text-danger py-5 text-center">
        Error: {error}
      </div>
    );

  return (
    <div className="pg-page">
      {/* ── Top Bar ── */}
      <div className="d-flex align-items-center justify-content-between px-4 py-3">
        <span className="pg-count">
          Showing 1–{sorted.length} of {sorted.length} results
        </span>
        <div className="pg-sort-wrap">
          <select
            className="pg-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <i className="fas fa-chevron-down pg-sort-arrow"></i>
        </div>
      </div>

      {/* ── Product Grid ── */}
      <div className="row g-0 mx-0">
        {sorted.map((product) => (
          <div className="col-12 col-md-4" key={product.id}>
            <div
              className="pg-card"
              onClick={() => navigate(`/products/${product.id}`)}
              style={{ cursor: "pointer" }}
            >
              {/* Image */}
              <div className="pg-img-wrap">
                <img
                  src={getImageUrl(product.primary_image)}
                  alt={product.title}
                  className="pg-img w-100"
                />
                <div className="pg-actions">
                  <button
                    className="pg-action-btn"
                    title="Wishlist"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fas fa-heart"></i>
                  </button>
                  <button
                    className="pg-action-btn"
                    title="Quick view"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/products/${product.id}`);
                    }}
                  >
                    <i className="fas fa-eye"></i>
                  </button>
                  <button
                    className="pg-action-btn"
                    title="Add to cart"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="fas fa-shopping-cart"></i>
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="pg-info px-3 py-3">
                <StarRating rating={4.5} />
                <div className="pg-category mt-1">{product.category}</div>
                <h3 className="pg-title mt-1 mb-1">{product.title}</h3>
                <div className="d-flex align-items-center gap-2">
                  <span className="pg-price">
                    $
                    {parseFloat(
                      product.discounted_price || product.price,
                    ).toFixed(2)}
                  </span>
                  {product.discounted_price && (
                    <span className="pg-original">
                      ${parseFloat(product.price).toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
