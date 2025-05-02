const db = require("../db");

async function findByUserId(userId) {
  const [profiles] = await db.query(
    "SELECT * FROM profiles WHERE user_id = ?",
    [userId]
  );
  return profiles[0];
}

async function updateProfile(userId, profileData) {
  const { bio, skills, interests, role } = profileData;

  // Check if profile exists
  const [existing] = await db.query(
    "SELECT id FROM profiles WHERE user_id = ?",
    [userId]
  );

  if (existing.length > 0) {
    // Update existing profile
    const [result] = await db.query(
      `UPDATE profiles 
            SET bio = ?, skills = ?, interests = ?, role = ?
            WHERE user_id = ?`,
      [bio, skills, interests, role, userId]
    );
    return result;
  } else {
    // Create new profile
    const [result] = await db.query(
      `INSERT INTO profiles (user_id, bio, skills, interests, role)
            VALUES (?, ?, ?, ?, ?)`,
      [userId, bio, skills, interests, role]
    );
    return result;
  }
}

async function getProfileWithUserInfo(userId) {
  const [rows] = await db.query(
    `
    SELECT 
      u.name,
      u.username,
      p.role,
      p.bio,
      p.skills,
      p.interests
    FROM users u
    LEFT JOIN profiles p ON u.id = p.user_id
    WHERE u.id = ?
  `,
    [userId]
  );

  return rows[0];
}

module.exports = { findByUserId, updateProfile, getProfileWithUserInfo };
