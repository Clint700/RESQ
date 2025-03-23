const seed = require("./seed");
const db = require("../connection");

const runSeed = async () => {
  try {
    console.log("Starting database seeding...");
    await seed();
    console.log("Seeding complete.");
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await db.end();
  }
};

runSeed();