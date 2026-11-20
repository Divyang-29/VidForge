const pool = require("../config/db");

const findCoupon = async (code) => {
  const result = await pool.query("SELECT * FROM coupons WHERE code=$1", [
    code,
  ]);

  return result.rows[0];
};

module.exports = { findCoupon };
