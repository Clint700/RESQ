require('dotenv').config(); // Load environment variables
const { exec } = require('child_process');
const path = require('path');

const DB_USER = process.env.DB_USER;
const DB_NAME = process.env.DB_NAME;

if (!DB_USER || !DB_NAME) {
  console.error("❌ ERROR: Missing database credentials in .env file!");
  process.exit(1);
}

const runSqlFile = (file) => {
  const filePath = path.resolve(__dirname, file);
  const command = `psql -U ${DB_USER} -d ${DB_NAME} -f ${filePath}`;

  console.log(`🚀 Running SQL file: ${filePath}`);
  
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error executing ${file}:`, error.message);
      return;
    }
    if (stderr) {
      console.warn(`⚠️ Warnings/Errors in ${file}:`, stderr);
    } else {
      console.log(`✅ Successfully executed ${file}`);
    }
  });
};

runSqlFile('schema.sql');
runSqlFile('seed.sql');