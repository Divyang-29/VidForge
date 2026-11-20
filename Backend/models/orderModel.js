const pool = require("../config/db");

const createOrder = async (orderData) => {
  const query = `
 INSERT INTO orders
 (user_id,first_name,last_name,company_name,country,town,state,zip_code,
 phone,email,order_notes,payment_method,cart_total,discount,final_total)
 VALUES
 ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
 RETURNING *
 `;

  const values = [
    orderData.user_id,
    orderData.first_name,
    orderData.last_name,
    orderData.company_name,
    orderData.country,
    orderData.town,
    orderData.state,
    orderData.zip_code,
    orderData.phone,
    orderData.email,
    orderData.order_notes,
    orderData.payment_method,
    orderData.cart_total,
    orderData.discount,
    orderData.final_total,
  ];

  const result = await pool.query(query, values);

  return result.rows[0];
};

const createOrderItems = async (orderId, items) => {
  for (const item of items) {
    await pool.query(
      `
   INSERT INTO order_items
   (order_id,product_id,product_name,price,quantity,total)
   VALUES ($1,$2,$3,$4,$5,$6)
   `,
      [orderId, item.id, item.title, item.price, item.quantity, item.total],
    );
  }
};

const getAllOrders = async () => {
  const result = await pool.query(`
  SELECT *
  FROM orders
  ORDER BY created_at DESC
 `);

  return result.rows;
};

module.exports = {
  createOrder,
  createOrderItems,
  getAllOrders,
};
