const db = require('../db/connection');

const SmsLog = {};

SmsLog.create = async ({ alert_id, contact_id, message_sid, to_number, status, error_code, error_message }) => {
  const query = `
    INSERT INTO sms_logs (alert_id, contact_id, message_sid, to_number, status, error_code, error_message)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [alert_id, contact_id, message_sid, to_number, status, error_code, error_message];
  const result = await db.query(query, values);
  return result.rows[0];
};

module.exports = SmsLog;