const pool = require("../config/db");
const {
  createOrder,
  createOrderItems,
  getAllOrders,
} = require("../models/orderModel");

// checkout order
const checkout = async (req, res) => {
  try {
    const userId = req.user.id;

    const {
      first_name,
      last_name,
      company_name,
      country,
      town,
      state,
      zip_code,
      phone,
      email,
      order_notes,
      payment_method,
    } = req.body;

    const cart = await pool.query("SELECT * FROM carts WHERE user_id=$1", [
      userId,
    ]);

    if (cart.rows.length === 0) {
      return res.status(400).json({ message: "Cart not found" });
    }

    const cartId = cart.rows[0].id;

    const items = await pool.query(
      `
      SELECT
      p.id,
      p.title,
      p.price::float,
      ci.quantity,
      (p.price * ci.quantity)::float AS total
      FROM cart_items ci
      JOIN products p ON p.id = ci.product_id
      WHERE ci.cart_id=$1
      `,
      [cartId],
    );

    const cartItems = items.rows;

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const cartTotal = cartItems.reduce((sum, item) => sum + item.total, 0);

    const discount = Number(cart.rows[0].discount_amount) || 0;

    const finalTotal = cartTotal - discount;

    const order = await createOrder({
      user_id: userId,
      first_name,
      last_name,
      company_name,
      country,
      town,
      state,
      zip_code,
      phone,
      email,
      order_notes,
      payment_method,
      cart_total: cartTotal,
      discount,
      final_total: finalTotal,
    });

    await createOrderItems(order.id, cartItems);

    // reduce stock
    for (const item of cartItems) {
      await pool.query(`UPDATE products SET stock = stock - $1 WHERE id = $2`, [
        item.quantity,
        item.id,
      ]);
    }

    // clear cart
    await pool.query("DELETE FROM cart_items WHERE cart_id=$1", [cartId]);

    res.json({
      message: "Order placed successfully",
      order_id: order.id,
      cart_total: cartTotal,
      discount,
      final_total: finalTotal,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// user orders
const getOrders = async (req, res) => {
  try {
    const userId = req.user.id;

    const orders = await pool.query(
      `
      SELECT *
      FROM orders
      WHERE user_id=$1
      ORDER BY created_at DESC
      `,
      [userId],
    );

    res.json(orders.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// single order
const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await pool.query(`SELECT * FROM orders WHERE id=$1`, [id]);

    if (order.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    const items = await pool.query(
      `SELECT * FROM order_items WHERE order_id=$1`,
      [id],
    );

    res.json({
      order: order.rows[0],
      items: items.rows,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// admin orders
const getAdminOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();

    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  checkout,
  getOrders,
  getOrderById,
  getAdminOrders,
};
