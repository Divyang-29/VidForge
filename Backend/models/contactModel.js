const pool = require("../config/db");

const createContact = async (name, email, phone, website, message) => {
  const query = `
    INSERT INTO contacts (name, email, phone, website, message)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [name, email, phone, website, message];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getContacts = async () => {
  const result = await pool.query(
    "SELECT * FROM contacts ORDER BY created_at DESC",
  );

  return result.rows;
};

const deleteContact = async (id) => {
  await pool.query("DELETE FROM contacts WHERE id=$1", [id]);
};

module.exports = {
  createContact,
  getContacts,
  deleteContact,
};
