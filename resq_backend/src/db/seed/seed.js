const format = require("pg-format");
const db = require("../connection");
const userData = require("../data/test-data/users");
const contactData = require("../data/test-data/contacts");
const alertData = require("../data/test-data/alerts");

const seed = async () => {
  await db.query(`DROP TABLE IF EXISTS alerts, emergency_contacts, users CASCADE;`);

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
      user_id INTEGER REFERENCES users(id),
      name VARCHAR(100) NOT NULL,
      phone_number VARCHAR(20) NOT NULL
    );
  `);

  await db.query(`
    CREATE TABLE alerts (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      location VARCHAR(255) NOT NULL,
      status VARCHAR(50) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Insert users
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

  // Insert contacts
  const contactValues = contactData.map(({ email, name, phone_number }) => [
    userEmailToId[email],
    name,
    phone_number,
  ]);
  const insertContactsQuery = format(
    "INSERT INTO emergency_contacts (user_id, name, phone_number) VALUES %L;",
    contactValues
  );
  await db.query(insertContactsQuery);

  // Insert alerts
  const alertValues = alertData.map(({ email, location, status }) => [
    userEmailToId[email],
    location,
    status,
  ]);
  const insertAlertsQuery = format(
    "INSERT INTO alerts (user_id, location, status) VALUES %L;",
    alertValues
  );
  await db.query(insertAlertsQuery);

  console.log("Database seeded successfully");
};

module.exports = seed;