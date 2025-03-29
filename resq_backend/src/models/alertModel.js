const db = require('../db/connection');

const Alert = {};

Alert.create = async (userId, message, location, status) => {
  const query = 'INSERT INTO alerts (user_id, message, location, status) VALUES ($1, $2, $3, $4) RETURNING *';
  const values = [userId, message, location, status];
  const result = await db.query(query, values);
  return result.rows[0];
};

Alert.updateStatus = async (id, message, location, status) => {
  const query = 'UPDATE alerts SET message = $1, location = $2, status = $3 WHERE id = $4 RETURNING *';
  const values = [message, location, status, id];
  const result = await db.query(query, values);
  return result.rows[0];
};

Alert.getAllByUserId = async (userId) => {
  const query = 'SELECT * FROM alerts WHERE user_id = $1';
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows;
};

Alert.getById = async (id) => {
  const query = 'SELECT * FROM alerts WHERE id = $1';
  const values = [id];
  const result = await db.query(query, values);
  return result.rows[0];
};

Alert.deleteById = async (alertId) => {
  const query = 'DELETE FROM alerts WHERE id = $1 RETURNING *';
  const values = [alertId];
  const result = await db.query(query, values);
  return result.rowCount > 0;
};

module.exports = Alert;