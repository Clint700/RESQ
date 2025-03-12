const db = require('../config/db');

const Alert = {};

Alert.create = async (userId, location, status) => {
  const query = 'INSERT INTO alerts (user_id, location, status) VALUES ($1, $2, $3) RETURNING *';
  const values = [userId, location, status];
  const result = await db.query(query, values);
  return result.rows[0];
};

Alert.updateStatus = async (alertId, status) => {
  const query = 'UPDATE alerts SET status = $1 WHERE id = $2 RETURNING *';
  const values = [status, alertId];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = Alert;
