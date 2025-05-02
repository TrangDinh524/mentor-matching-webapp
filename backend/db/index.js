const mysql = require("mysql2/promise");
require("dotenv").config();

// Configure SSL connection if DB_SSL_CA is set
let sslConfig = null;
if (process.env.DB_SSL_CA) {
  try {
    const decodedCa = Buffer.from(process.env.DB_SSL_CA, "base64").toString(
      "ascii"
    );
    sslConfig = {
      rejectUnauthorized: true,
      ca: decodedCa,
    };
    console.log("Database SSL configured using CA certificate from environment variable.");
  } catch (error) {
    console.error("!!! Error decoding Base64 CA cert from DB_SSL_CA:", error);
    sslConfig = { rejectUnauthorized: true };
  }
} else {
  console.warn("!!! DB_SSL_CA environment variable not set. TiDB Cloud requires TLS/SSL with CA verification. Connection might fail.");
  sslConfig = { rejectUnauthorized: true };
}

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 4000,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: sslConfig,
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
