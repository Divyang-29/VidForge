const pool = require("../config/db");

const createUser = async (username, email, password, role) => {
  const query = `
    INSERT INTO users (username, email, password, role)
    VALUES ($1, $2, $3, $4)
    RETURNING id, username, email, role
  `;

  const values = [username, email, password, role];
  const result = await pool.query(query, values);

  return result.rows[0];
};

const findUserByIdentifier = async (identifier) => {
  const query = `
    SELECT * FROM users
    WHERE email = $1 OR username = $1
  `;

  const result = await pool.query(query, [identifier]);
  return result.rows[0];
};

module.exports = {
  createUser,
  findUserByIdentifier,
};
