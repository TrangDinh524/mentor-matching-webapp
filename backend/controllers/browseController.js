const User = require("../models/user");
const Connection = require("../models/connection");

exports.getUsers = async (req, res) => {
  try {
    const { role, skills, interests } = req.query;
    const userId = req.user.id;

    // Get users with their profiles
    let users = await User.findUsersWithProfiles(userId);

    // Get all connections for current user
    const connections = await Connection.getConnectionsForAUser(userId);

    // Add connection status to each user
    users = users.map((user) => {
      const connection = connections.find(
        (c) =>
          (c.sender_id === userId && c.receiver_id === user.id) ||
          (c.sender_id === user.id && c.receiver_id === userId)
      );

      return {
        ...user,
        connectionStatus: connection ? connection.status : null,
        isRequestSender: connection ? connection.sender_id === userId : false,
      };
    });

    // Apply filters
    let filteredUsers = users;

    if (role) {
      filteredUsers = filteredUsers.filter(
        (user) => user.role.toLowerCase() === role.toLowerCase()
      );
    }

    if (skills) {
      const skillsArray = skills
        .toLowerCase()
        .split(",")
        .map((s) => s.trim());
      filteredUsers = filteredUsers.filter((user) => {
        if (!user.skills) return false;
        const userSkills = user.skills
          .toLowerCase()
          .split(",")
          .map((s) => s.trim());
        return skillsArray.some((skill) => userSkills.includes(skill));
      });
    }

    if (interests) {
      const interestsArray = interests
        .toLowerCase()
        .split(",")
        .map((i) => i.trim());
      filteredUsers = filteredUsers.filter((user) => {
        if (!user.interests) return false;
        const userInterests = user.interests
          .toLowerCase()
          .split(",")
          .map((i) => i.trim());
        return interestsArray.some((interest) =>
          userInterests.includes(interest)
        );
      });
    }

    res.json(filteredUsers);
  } catch (err) {
    console.error("Error in getUsers:", err);
    res.status(500).json({ error: err.message });
  }
};
