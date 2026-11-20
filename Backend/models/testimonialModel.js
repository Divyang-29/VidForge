const pool = require("../config/db");

const createTestimonial = async (data) => {
  const result = await pool.query(
    `
 INSERT INTO testimonials
 (testimonial,writer_name,position)
 VALUES ($1,$2,$3)
 RETURNING *
 `,
    [data.testimonial, data.writer_name, data.position],
  );

  return result.rows[0];
};

const getTestimonials = async () => {
  const result = await pool.query(
    "SELECT * FROM testimonials ORDER BY created_at DESC",
  );

  return result.rows;
};

const deleteTestimonial = async (id) => {
  await pool.query("DELETE FROM testimonials WHERE id=$1", [id]);
};

module.exports = {
  createTestimonial,
  getTestimonials,
  deleteTestimonial,
};
