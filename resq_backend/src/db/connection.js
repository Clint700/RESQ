const { Pool } = require("pg");
const path = require("path");

// Ensure environment variables are loaded
require("dotenv").config({
  path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV || "development"}`),
});

if (!process.env.PGDATABASE && !process.env.DATABASE_URL) {
  console.error("PGDATABASE or DATABASE_URL not set!");
  throw new Error("PGDATABASE or DATABASE_URL not set");
}

const config = {};

if (process.env.NODE_ENV === "production") {
  config.connectionString = process.env.DATABASE_URL;
  config.max = 2;
  config.ssl = { rejectUnauthorized: false };
} else {
  config.database = process.env.PGDATABASE;
}

const pool = new Pool(config);

module.exports = pool;