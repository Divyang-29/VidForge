import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./WishlistPage.css";
import { API_URL } from "../../../config/api";

export default function WishlistPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getImageUrl = (f) => `${API_URL}/uploads/${f}`;

  const authHeaders = () => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API_URL}/wishlist`, { headers: authHeaders() })
      .then((r) => {
        if (r.status === 401) {
          navigate("/login");
          throw new Error("Unauthorized");
        }
        if (!r.ok) throw new Error("Failed to fetch wishlist");
        return r.json();
      })
      .then((d) => {
        setItems(Array.isArray(d) ? d : d.items || []);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const removeItem = (id) => {
    fetch(`${API_URL}/wishlist/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then(() => setItems((prev) => prev.filter((i) => i.id !== id)));
  };

  const addToCart = (id) => {
    fetch(`${API_URL}/cart`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ product_id: id, quantity: 1 }),
    }).then((r) => {
      if (r.ok) navigate("/cart");
    });
  };

  if (loading)
    return (
      <div className="wl-page">
        <p className="wl-state">Loading...</p>
      </div>
    );
  if (error)
    return (
      <div className="wl-page">
        <p className="wl-state wl-error">Error: {error}</p>
      </div>
    );

  return (
    <div className="wl-page">
      <div className="container-fluid px-4 px-md-5">
        <table className="wl-table">
          <thead>
            <tr className="wl-thead">
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Add to cart</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr>
                <td colSpan={5} className="wl-empty">
                  Your wishlist is empty.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id} className="wl-row">
                  {/* Delete */}
                  <td className="wl-delete" onClick={() => removeItem(item.id)}>
                    <i className="fas fa-trash-alt"></i>
                  </td>

                  {/* Product */}
                  <td className="wl-product">
                    <img
                      src={getImageUrl(item.primary_image)}
                      alt={item.title}
                      className="wl-img"
                    />
                    <span className="wl-name">{item.title}</span>
                  </td>

                  {/* Price */}
                  <td className="wl-price">
                    $
                    {parseFloat(item.discounted_price || item.price).toFixed(2)}
                  </td>

                  {/* Add to Cart */}
                  <td className="wl-add">
                    <span
                      className="wl-add-btn"
                      onClick={() => addToCart(item.id)}
                    >
                      Add To Cart
                    </span>
                  </td>

                  {/* Total */}
                  <td className="wl-total text-end">
                    $
                    {parseFloat(item.discounted_price || item.price).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
