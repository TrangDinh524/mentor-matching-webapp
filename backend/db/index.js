const mysql = require("mysql2/promise");
require("dotenv").config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test the connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    console.log("MySQL connection successful!");
    connection.release();
  } catch (err) {
    console.error("MySQL connection failed:", err.message);
  }
}

testConnection();

module.exports = pool;
