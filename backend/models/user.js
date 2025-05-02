const db = require("../db");

async function findUserByEmail(email) {
  const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return users;
}

async function createUser(name, username, email, password) {
  const [result] = await db.query(
    "INSERT INTO users (name, username, email, password) VALUES (?, ?, ?, ?)",
    [name, username, email, password]
  );
  console.log("insertId", result.insertId);
  return result.insertId;
}

async function findUsersWithProfiles(userId) {
  const [users] = await db.query(
    `SELECT u.id, u.username, u.email,
              p.role, p.bio, p.skills, p.interests
       FROM users u
       LEFT JOIN profiles p ON u.id = p.user_id
       WHERE u.id != ?`,
    [userId]
  );
  return users;
}

module.exports = {
  findUserByEmail,
  createUser,
  findUsersWithProfiles,
};
