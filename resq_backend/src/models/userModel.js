const db = require('../db/connection');
const bcrypt = require('bcryptjs');

const User = {};

User.create = async (email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = `
    INSERT INTO users (email, password)
    VALUES ($1, $2)
    RETURNING id, email;
  `;
  const values = [email, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
};

User.findByEmail = async (email) => {
  const query = `SELECT * FROM users WHERE email = $1;`;
  const result = await db.query(query, [email]);
  return result.rows[0];
};

module.exports = User;