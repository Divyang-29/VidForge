import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CartPage.css";
import { API_URL } from "../../../config/api";

export default function CartPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], cart_total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponMsg, setCouponMsg] = useState(null);
  const [shipping, setShipping] = useState("free");

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
    fetch(`${API_URL}/cart`, { headers: authHeaders() })
      .then((r) => {
        if (r.status === 401) {
          navigate("/login");
          throw new Error("Unauthorized");
        }
        if (!r.ok) throw new Error("Failed to load cart");
        return r.json();
      })
      .then((d) => {
        setCart(d);
        setLoading(false);
      })
      .catch((e) => {
        setError(e.message);
        setLoading(false);
      });
  }, []);

  const updateQty = (id, delta) => {
    setCart((prev) => {
      const items = prev.items.map((item) => {
        if (item.id !== id) return item;
        const qty = Math.max(1, Math.min(item.stock, item.quantity + delta));
        return { ...item, quantity: qty, total: qty * item.price };
      });
      return {
        items,
        cart_total: items.reduce((s, i) => s + Number(i.total), 0),
      };
    });
  };

  const removeItem = (id) => {
    setCart((prev) => {
      const items = prev.items.filter((i) => i.id !== id);
      return {
        items,
        cart_total: items.reduce((s, i) => s + Number(i.total), 0),
      };
    });
  };

  const handleApplyCoupon = async () => {
    setCouponMsg(null);
    if (!coupon.trim()) return;
    try {
      const res = await fetch(`${API_URL}/cart/apply-coupon`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ code: coupon }),
      });
      const data = await res.json();
      if (!res.ok) {
        setCouponMsg({ type: "error", text: data.message });
        return;
      }
      setDiscount(data.discount);
      setCouponMsg({ type: "success", text: data.message });
    } catch {
      setCouponMsg({ type: "error", text: "Failed to apply coupon" });
    }
  };

  const shippingCost = shipping === "flat" ? 60 : 0;
  const grandTotal = cart.cart_total - discount + shippingCost;

  if (loading)
    return (
      <div className="cart-page">
        <p className="cart-state">Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="cart-page">
        <p className="cart-state text-danger">Error: {error}</p>
      </div>
    );

  return (
    <div className="cart-page">
      <div className="container-fluid px-4 px-md-5">
        {/* ── Cart Table ── */}
        <table className="cart-table w-100">
          <thead>
            <tr className="cart-thead">
              <th></th>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                    color: "#888",
                  }}
                >
                  Your cart is empty.
                </td>
              </tr>
            ) : (
              cart.items.map((item) => (
                <tr key={item.id} className="cart-row">
                  {/* Delete */}
                  <td
                    className="cart-delete"
                    onClick={() => removeItem(item.id)}
                  >
                    <i className="fas fa-trash-alt"></i>
                  </td>

                  {/* Product */}
                  <td className="cart-product">
                    <img
                      src={getImageUrl(item.primary_image)}
                      alt={item.title}
                      className="cart-img"
                    />
                    <span className="cart-name">{item.title}</span>
                  </td>

                  {/* Price */}
                  <td className="cart-price">
                    ${parseFloat(item.price).toFixed(2)}
                  </td>

                  {/* Quantity */}
                  <td className="cart-qty-cell">
                    <div className="cart-qty">
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, -1)}
                      >
                        <i className="fas fa-minus"></i>
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        className="qty-btn"
                        onClick={() => updateQty(item.id, 1)}
                      >
                        <i className="fas fa-plus"></i>
                      </button>
                    </div>
                  </td>

                  {/* Total */}
                  <td className="cart-total-cell text-end">
                    ${parseFloat(item.total).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* ── Coupon + Update ── */}
        <div className="cart-actions d-flex align-items-center justify-content-between mt-4">
          <div>
            <div className="d-flex gap-2">
              <input
                type="text"
                className="coupon-input"
                placeholder="Coupon Code"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
              />
              <button className="btn-apply" onClick={handleApplyCoupon}>
                Apply Coupon
              </button>
            </div>
            {couponMsg && (
              <p
                style={{
                  color: couponMsg.type === "success" ? "#2ecc71" : "#e74c3c",
                  fontSize: "13px",
                  marginTop: "6px",
                  marginBottom: 0,
                }}
              >
                {couponMsg.text}
              </p>
            )}
          </div>
          <button className="btn-update">Update Cart</button>
        </div>

        {/* ── Cart Total ── */}
        <div className="cart-total-section mt-5">
          <h2 className="cart-total-heading">Cart Total</h2>

          <div className="cart-summary">
            {/* Subtotal */}
            <div className="summary-row">
              <span className="summary-label">Subtotal</span>
              <span className="summary-value">
                ${cart.cart_total.toFixed(2)}
              </span>
            </div>
            <div className="summary-divider" />

            {/* Discount */}
            {discount > 0 && (
              <>
                <div className="summary-row">
                  <span className="summary-label" style={{ color: "#2ecc71" }}>
                    Discount
                  </span>
                  <span className="summary-value" style={{ color: "#2ecc71" }}>
                    -${discount.toFixed(2)}
                  </span>
                </div>
                <div className="summary-divider" />
              </>
            )}

            {/* Shipping */}
            <div className="summary-row summary-shipping">
              <span className="summary-label">Shipping</span>
              <div className="shipping-options">
                {[
                  { value: "free", label: "Free Shipping" },
                  { value: "flat", label: "Flat Rate (+$60)" },
                  { value: "pickup", label: "Local Pickup" },
                ].map((opt) => (
                  <label key={opt.value} className="shipping-opt">
                    <input
                      type="radio"
                      name="shipping"
                      value={opt.value}
                      checked={shipping === opt.value}
                      onChange={() => setShipping(opt.value)}
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>
            <div className="summary-divider" />

            {/* Grand Total */}
            <div className="summary-row">
              <span className="summary-label fw-bold">Total</span>
              <span className="summary-value">${grandTotal.toFixed(2)}</span>
            </div>
            <div className="summary-divider" />

            {/* Checkout */}
            <button
              className="btn-checkout"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
