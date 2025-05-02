const Connection = require("../models/connection");

exports.sendRequest = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { receiverId } = req.body;

    // Check if connection already exists
    const existingConnection = await Connection.getConnectionStatus(
      senderId,
      receiverId
    );
    if (existingConnection) {
      return res.status(400).json({
        error: "Connection request already exists",
      });
    }

    await Connection.createConnection(senderId, receiverId);
    res.status(201).json({
      message: "Connection request sent successfully",
      status: "pending",
    });
  } catch (err) {
    console.error("Error sending connection request:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateRequest = async (req, res) => {
  try {
    const userId = req.user.id;
    const { connectionId, status } = req.body;

    await Connection.updateConnectionStatus(connectionId, status);
    res.json({
      message: `Connection request ${status} successfully`,
    });
  } catch (err) {
    console.error("Error updating connection request:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.getPendingRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const connections = await Connection.getPendingConnections(userId);
    res.json(connections);
  } catch (err) {
    console.error("Error getting pending requests:", err);
    res.status(500).json({ error: err.message });
  }
};
