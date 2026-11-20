const {
  getOrCreateCart,
  addItemToCart,
  getCartItems,
} = require("../models/cartModel");

const { findCoupon } = require("../models/couponModel");

const pool = require("../config/db");

// ADD TO CART
const addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { product_id, quantity } = req.body;

    const product = await pool.query("SELECT stock FROM products WHERE id=$1", [
      product_id,
    ]);

    if (product.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (quantity > product.rows[0].stock) {
      return res.status(400).json({ message: "Not enough stock" });
    }

    const cart = await getOrCreateCart(userId);

    const item = await addItemToCart(cart.id, product_id, quantity);

    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET CART
const getCart = async (req, res) => {
  try {
    const userId = req.user.id;

    const cart = await getOrCreateCart(userId);

    const items = await getCartItems(cart.id);

    const total = items.reduce((sum, item) => sum + Number(item.total), 0);

    res.json({ items, cart_total: total });
  } catch (err) {
    console.error("getCart error:", err); // 👈 add this
    res.status(500).json({ error: err.message });
  }
};

// APPLY COUPON
const applyCoupon = async (req, res) => {
  try {
    const userId = req.user.id;
    const { code } = req.body;

    const cart = await pool.query("SELECT * FROM carts WHERE user_id=$1", [
      userId,
    ]);

    if (cart.rows.length === 0) {
      return res.status(400).json({
        message: "Cart not found",
      });
    }

    const cartId = cart.rows[0].id;

    const coupon = await findCoupon(code);

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid coupon",
      });
    }

    // Calculate cart total
    const cartTotal = await pool.query(
      `
      SELECT SUM(p.price * ci.quantity) AS total
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      WHERE ci.cart_id=$1
      `,
      [cartId],
    );

    const total = Number(cartTotal.rows[0].total) || 0;

    if (total < coupon.min_cart_value) {
      return res.status(400).json({
        message: `Minimum cart value ${coupon.min_cart_value}`,
      });
    }

    let discount = 0;

    if (coupon.discount_type === "percentage") {
      discount = total * (coupon.discount_value / 100);
    } else {
      discount = coupon.discount_value;
    }

    const finalTotal = total - discount;

    await pool.query(
      `
      UPDATE carts
      SET coupon_code=$1,
          discount_amount=$2
      WHERE id=$3
      `,
      [code, discount, cartId],
    );

    res.json({
      message: "Coupon applied successfully",
      cart_total: total,
      discount: discount,
      final_total: finalTotal,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  addToCart,
  getCart,
  applyCoupon,
};
