const { all } = require('axios');
const db = require('../db/connection');

const EmergencyContact = {};

EmergencyContact.create = async (email, name, phone_number) => {
  const allQuery = 'SELECT * FROM emergency_contacts WHERE email = $1 OR phone_number = $2 OR name = $3';
  const allValues = [email, phone_number, name];
  const allResult = await db.query(allQuery, allValues);

  if (allResult.rows.length > 0) {
    return { status: 402, message: 'Email, phone number, or name already exists' };
  }

  const query = 'INSERT INTO emergency_contacts (email, name, phone_number) VALUES ($1, $2, $3) RETURNING *';
  const values = [email, name, phone_number];
  const result = await db.query(query, values);
  return result.rows[0];
};

EmergencyContact.findUsers = async () => {
  const query = 'SELECT * FROM emergency_contacts';
  const result = await db.query(query);
  return result.rows;
};

EmergencyContact.findByUserId = async (userId) => {
  const query = 'SELECT * FROM emergency_contacts WHERE id = $1';
  const values = [userId];
  const result = await db.query(query, values);
  return result.rows[0];
};

EmergencyContact.patchUserById = async (userId, email, name, phone_number) => {
  const query = 'UPDATE emergency_contacts SET email = $1, name = $2, phone_number = $3 WHERE id = $4 RETURNING *';
  const values = [email, name, phone_number, userId];
  const result = await db.query(query, values);
  if (result.rows[0]) {
    return result.rows[0];
  }
  return null;
};

EmergencyContact.deleteUserById = async (userId) => {
  const query = 'DELETE FROM emergency_contacts WHERE id = $1 RETURNING *';
  const values = [userId];
  const result = await db.query(query, values);
  if (result.rows[0]) {
    return result.rows[0];
  } else {
    return null;
  };
}

module.exports = EmergencyContact;