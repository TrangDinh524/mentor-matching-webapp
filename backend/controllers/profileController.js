const Profile = require("../models/profile");
const jwt = require("jsonwebtoken");

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const profile = await Profile.getProfileWithUserInfo(userId);
    res.json(profile || {});
  } catch (err) {
    console.error("Error getting profile:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await Profile.updateProfile(userId, req.body);

    res.json({
      message: "Profile updated successfully",
      profile: { userId, ...req.body },
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: err.message });
  }
};
