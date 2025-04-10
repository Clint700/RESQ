const format = require("pg-format");
const db = require("../connection");
const userData = require("../data/test-data/users");
const contactData = require("../data/test-data/contacts");
const alertData = require("../data/test-data/alerts");
const smsLogData = require("../data/test-data/smsLogs");

const seed = async () => {
  await db.query(`DROP TABLE IF EXISTS sms_logs, alerts, emergency_contacts, users CASCADE;`);

  await db.query(`
    CREATE TABLE users (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE emergency_contacts (
      id SERIAL PRIMARY KEY,
      email VARCHAR(255) NOT NULL,
      name VARCHAR(100) NOT NULL,
      phone_number VARCHAR(20) NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE alerts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      message VARCHAR(255),
      location VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  await db.query(`
    CREATE TABLE sms_logs (
      id SERIAL PRIMARY KEY,
      alert_id INTEGER REFERENCES alerts(id) ON DELETE CASCADE,
      contact_id INTEGER REFERENCES emergency_contacts(id) ON DELETE CASCADE,
      message_sid TEXT,
      to_number TEXT,
      status TEXT,
      error_code TEXT,
      error_message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  const userValues = userData.map(({ email, password }) => [email, password]);
  const insertUsersQuery = format(
    "INSERT INTO users (email, password) VALUES %L RETURNING *;",
    userValues
  );
  const insertedUsers = await db.query(insertUsersQuery);

  const userEmailToId = {};
  insertedUsers.rows.forEach((user) => {
    userEmailToId[user.email] = user.id;
  });

  const contactValues = contactData.map(({ email, name, phone_number }) => [
    email,
    name,
    phone_number,
  ]);
  const insertContactsQuery = format(
    "INSERT INTO emergency_contacts (email, name, phone_number) VALUES %L RETURNING *;",
    contactValues
  );
  const insertedContacts = await db.query(insertContactsQuery);

  const alertValues = alertData.map(({ message, location, status }) => [
    message,
    location,
    status,
  ]);
  const insertAlertsQuery = format(
    "INSERT INTO alerts (message, location, status) VALUES %L RETURNING *;",
    alertValues
  );
  await db.query(insertAlertsQuery);

  // Optionally insert a test log into sms_logs here if needed
  const smsLogValues = smsLogData.map(
    ({ alert_id, contact_id, message_sid, to_number, status, error_code, error_message }) => [
      alert_id,
      contact_id,
      message_sid,
      to_number,
      status,
      error_code,
      error_message,
    ]
  );
  
  const insertSmsLogsQuery = format(
    `
      INSERT INTO sms_logs
        (alert_id, contact_id, message_sid, to_number, status, error_code, error_message)
      VALUES %L RETURNING *;
    `,
    smsLogValues
  );
  
  await db.query(insertSmsLogsQuery);
};

module.exports = seed;