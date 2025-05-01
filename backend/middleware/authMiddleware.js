const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // Get token from header
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      return res
        .status(401)
        .json({ error: "No authentication token, access denied" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Add user from payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: "Token is not valid" });
  }
};

module.exports = authMiddleware;
