const pool = require("../config/db");

const addToWishlist = async (userId, productId) => {
  const existing = await pool.query(
    "SELECT * FROM wishlist WHERE user_id=$1 AND product_id=$2",
    [userId, productId],
  );

  if (existing.rows.length > 0) {
    return existing.rows[0];
  }

  const result = await pool.query(
    `
  INSERT INTO wishlist (user_id,product_id)
  VALUES ($1,$2)
  RETURNING *
  `,
    [userId, productId],
  );

  return result.rows[0];
};

const getWishlist = async (userId) => {
  const result = await pool.query(
    `
 SELECT
 p.id,
 p.title,
 p.primary_image,
 p.price::float
 FROM wishlist w
 JOIN products p ON p.id = w.product_id
 WHERE w.user_id=$1
 `,
    [userId],
  );

  return result.rows;
};

const removeWishlist = async (userId, productId) => {
  await pool.query(
    `
  DELETE FROM wishlist
  WHERE user_id=$1 AND product_id=$2
  `,
    [userId, productId],
  );
};

module.exports = {
  addToWishlist,
  getWishlist,
  removeWishlist,
};
