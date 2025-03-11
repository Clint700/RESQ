const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {};

User.create = async (username, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  const query = 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *';
  const values = [username, hashedPassword];
  const result = await db.query(query, values);
  return result.rows[0];
};

User.findByUsername = async (username) => {
  const query = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = User;
