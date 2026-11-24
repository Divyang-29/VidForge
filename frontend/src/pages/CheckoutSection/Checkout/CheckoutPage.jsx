import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CheckoutPage.css";
import { API_URL } from "../../../config/api";

const COUNTRIES = [
  "India",
  "United States",
  "United Kingdom",
  "Australia",
  "Canada",
  "Germany",
  "France",
  "UAE",
];
const PAYMENT_METHODS = [
  {
    value: "bank",
    label:
      "Make your payment directly into our bank account. Please use your Order ID as the payment reference.",
  },
  { value: "check", label: "Check Payment" },
  { value: "cod", label: "Cash On Delivery" },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], cart_total: 0 });
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    company_name: "",
    country: "",
    town: "",
    state: "",
    zip_code: "",
    phone: "",
    email: "",
    order_notes: "",
  });
  const [shipDiff, setShipDiff] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [agreed, setAgreed] = useState(false);
  const [agreedRight, setAgreedRight] = useState(false);
  const [couponOpen, setCouponOpen] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
          throw new Error("Unauth");
        }
        return r.json();
      })
      .then((d) => setCart(d))
      .catch(() => {});
  }, []);

  const handleChange = (e) =>
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handlePlaceOrder = async () => {
    setError(null);
    if (
      !form.first_name ||
      !form.last_name ||
      !form.country ||
      !form.town ||
      !form.email
    ) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!agreedRight) {
      setError("Please accept the terms & conditions.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/order/checkout`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({ ...form, payment_method: payment }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Order failed");
      navigate("/");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const subtotal = cart.cart_total || 0;
  const shippingCost = "flat rate";
  const total = subtotal + 140;

  return (
    <div className="cp-page">
      <div className="container-fluid px-4 px-md-5">
        {/* Coupon bar */}
        <p className="cp-coupon-bar">
          Have A Coupon Code?{" "}
          <span
            className="cp-coupon-link"
            onClick={() => setCouponOpen((v) => !v)}
          >
            Click Here
          </span>{" "}
          To Enter Coupon Code
        </p>
        {couponOpen && (
          <div className="cp-coupon-row">
            <input
              className="cp-input"
              placeholder="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="cp-btn-orange">Apply Coupon</button>
          </div>
        )}

        <div className="row g-4">
          {/* ── LEFT: Billing Details ── */}
          <div className="col-12 col-lg-7">
            <h2 className="cp-heading">Billing Details</h2>

            {/* First + Last */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <label className="cp-label">First name*</label>
                <input
                  className="cp-input"
                  name="first_name"
                  placeholder="First name here"
                  value={form.first_name}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-6">
                <label className="cp-label">Last name*</label>
                <input
                  className="cp-input"
                  name="last_name"
                  placeholder="Last name here"
                  value={form.last_name}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Company */}
            <div className="mb-3">
              <label className="cp-label">Company name*</label>
              <input
                className="cp-input"
                name="company_name"
                placeholder="Company name here(Optional)"
                value={form.company_name}
                onChange={handleChange}
              />
            </div>

            {/* Country */}
            <div className="mb-3">
              <label className="cp-label">Country/Region*</label>
              <div className="cp-select-wrap">
                <select
                  className="cp-select"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                >
                  <option value="">Country</option>
                  {COUNTRIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <i className="fas fa-chevron-down cp-select-arrow"></i>
              </div>
            </div>

            {/* Town + State */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <label className="cp-label">Town/City*</label>
                <div className="cp-select-wrap">
                  <select
                    className="cp-select"
                    name="town"
                    value={form.town}
                    onChange={handleChange}
                  >
                    <option value="">City</option>
                    <option value="Ahmedabad">Ahmedabad</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="New York">New York</option>
                    <option value="London">London</option>
                  </select>
                  <i className="fas fa-chevron-down cp-select-arrow"></i>
                </div>
              </div>
              <div className="col-12 col-sm-6">
                <label className="cp-label">State</label>
                <div className="cp-select-wrap">
                  <select
                    className="cp-select"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                  >
                    <option value="">City</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="California">California</option>
                  </select>
                  <i className="fas fa-chevron-down cp-select-arrow"></i>
                </div>
              </div>
            </div>

            {/* ZIP + Phone */}
            <div className="row g-3 mb-3">
              <div className="col-12 col-sm-6">
                <label className="cp-label">ZIP Code</label>
                <input
                  className="cp-input"
                  name="zip_code"
                  placeholder="ZIP Code"
                  value={form.zip_code}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-sm-6">
                <label className="cp-label">Phone</label>
                <input
                  className="cp-input"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="cp-label">Email Address*</label>
              <input
                className="cp-input"
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            {/* Ship to different */}
            <label className="cp-checkbox-row mb-3">
              <input
                type="checkbox"
                checked={shipDiff}
                onChange={() => setShipDiff((v) => !v)}
              />
              Ship To A Different Address?
            </label>

            {/* Order Notes */}
            <div className="mb-4">
              <label className="cp-label">Order Notes(optional)</label>
              <textarea
                className="cp-input cp-textarea"
                name="order_notes"
                placeholder="Order Note"
                value={form.order_notes}
                onChange={handleChange}
              />
            </div>

            {/* Terms left */}
            <label className="cp-checkbox-row mb-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={() => setAgreed((v) => !v)}
              />
              I have read And Accept the{" "}
              <span className="cp-terms-link">Terms &amp; Conditions</span>
            </label>

            <button className="cp-btn-orange cp-btn-save" onClick={() => {}}>
              Save Information
            </button>
          </div>

          {/* ── RIGHT: Order Summary ── */}
          <div className="col-12 col-lg-5">
            <div className="cp-order-box">
              <h3 className="cp-order-title">Your Orders</h3>

              {cart.items?.map((item) => (
                <div key={item.id} className="cp-order-row">
                  <span className="cp-order-name">{item.title}</span>
                  <span className="cp-order-price">
                    ${parseFloat(item.total).toFixed(2)}
                  </span>
                </div>
              ))}

              <div className="cp-order-row">
                <span className="cp-order-name">Subtotal</span>
                <span className="cp-order-price">${subtotal.toFixed(2)}</span>
              </div>
              <div className="cp-order-row">
                <span className="cp-order-name">Shipping Cost</span>
                <span className="cp-order-price">{shippingCost}</span>
              </div>
              <div className="cp-order-row cp-order-total">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Payment Method */}
              <h3 className="cp-order-title mt-4">Payment Method</h3>
              <div className="cp-payment-options">
                {PAYMENT_METHODS.map((m) => (
                  <label key={m.value} className="cp-payment-opt">
                    <input
                      type="radio"
                      name="payment"
                      value={m.value}
                      checked={payment === m.value}
                      onChange={() => setPayment(m.value)}
                    />
                    <span>{m.label}</span>
                  </label>
                ))}
              </div>

              {/* Terms right */}
              <label className="cp-checkbox-row mt-3">
                <input
                  type="checkbox"
                  checked={agreedRight}
                  onChange={() => setAgreedRight((v) => !v)}
                />
                I've read &amp; accept the{" "}
                <span className="cp-terms-link">Terms &amp; Conditions</span>
              </label>

              {error && <p className="cp-error mt-2">{error}</p>}

              <button
                className="cp-btn-orange cp-btn-place mt-3"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
