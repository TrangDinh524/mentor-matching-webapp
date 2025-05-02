const db = require("../db");

async function createConnection(senderId, receiverId) {
  const [result] = await db.query(
    `INSERT INTO connections (sender_id, receiver_id) 
         VALUES (?, ?)`,
    [senderId, receiverId]
  );
  return result.insertId;
}

async function updateConnectionStatus(senderId, receiverId, status) {
  const [result] = await db.query(
    `UPDATE connections 
         SET status = ? 
         WHERE sender_id = ? AND receiver_id = ?`,
    [status, senderId, receiverId]
  );
  return result;
}

async function getConnectionStatus(userId1, userId2) {
  const [connections] = await db.query(
    `SELECT * FROM connections 
         WHERE (sender_id = ? AND receiver_id = ?) 
         OR (sender_id = ? AND receiver_id = ?)`,
    [userId1, userId2, userId2, userId1]
  );
  return connections[0];
}

async function getConnectionsForAUser(userId) {
  const [connections] = await db.query(
    `SELECT c.*, 
                u1.name as sender_name, 
                u2.name as receiver_name
         FROM connections c
         JOIN users u1 ON c.sender_id = u1.id
         JOIN users u2 ON c.receiver_id = u2.id
         WHERE sender_id = ? OR receiver_id = ?`,
    [userId, userId]
  );
  return connections;
}

module.exports = {
  createConnection,
  updateConnectionStatus,
  getConnectionStatus,
  getConnectionsForAUser,
};
