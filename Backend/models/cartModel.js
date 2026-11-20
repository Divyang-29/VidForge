const pool = require("../config/db");

const getOrCreateCart = async (userId) => {
  const cart = await pool.query("SELECT * FROM carts WHERE user_id=$1", [
    userId,
  ]);

  if (cart.rows.length > 0) {
    return cart.rows[0];
  }

  const newCart = await pool.query(
    "INSERT INTO carts (user_id) VALUES ($1) RETURNING *",
    [userId],
  );

  return newCart.rows[0];
};

const addItemToCart = async (cartId, productId, quantity) => {
  const existing = await pool.query(
    "SELECT * FROM cart_items WHERE cart_id=$1 AND product_id=$2",
    [cartId, productId],
  );

  if (existing.rows.length > 0) {
    const updated = await pool.query(
      `UPDATE cart_items
    SET quantity = quantity + $1
    WHERE cart_id=$2 AND product_id=$3
    RETURNING *`,
      [quantity, cartId, productId],
    );

    return updated.rows[0];
  }

  const newItem = await pool.query(
    `INSERT INTO cart_items (cart_id,product_id,quantity)
   VALUES ($1,$2,$3)
   RETURNING *`,
    [cartId, productId, quantity],
  );

  return newItem.rows[0];
};

const getCartItems = async (cartId) => {
  const result = await pool.query(
    `
    SELECT
    p.id,
    p.title,
    p.primary_image,
    p.price::float AS price,
    p.stock,
    ci.quantity,
    (p.price * ci.quantity)::float AS total
    FROM cart_items ci
    JOIN products p ON p.id = ci.product_id
    WHERE ci.cart_id = $1
    `,
    [cartId],
  );

  return result.rows;
};

module.exports = {
  getOrCreateCart,
  addItemToCart,
  getCartItems,
};
