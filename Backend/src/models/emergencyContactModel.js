const db = require('../config/db');

const EmergencyContact = {};

EmergencyContact.create = async (userId, name, phoneNumber) => {
  const query = 'INSERT INTO emergency_contacts (user_id, name, phone_number) VALUES ($1, $2, $3) RETURNING *';
  const values = [userId, name, phoneNumber];
  const result = await db.query(query, values);
  return result.rows[0];
};

EmergencyContact.findByUserId = async (userId) => {
  const query = 'SELECT * FROM emergency_contacts WHERE user_id = $1';
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows;
};

module.exports = EmergencyContact;
