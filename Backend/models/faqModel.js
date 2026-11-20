const pool = require("../config/db");

const createFAQ = async (question, answer) => {
  const result = await pool.query(
    `INSERT INTO faqs (question, answer)
     VALUES ($1,$2)
     RETURNING *`,
    [question, answer],
  );

  return result.rows[0];
};

const getFAQs = async () => {
  const result = await pool.query(`SELECT * FROM faqs ORDER BY id DESC`);

  return result.rows;
};

const deleteFAQ = async (id) => {
  await pool.query(`DELETE FROM faqs WHERE id=$1`, [id]);
};

module.exports = {
  createFAQ,
  getFAQs,
  deleteFAQ,
};
