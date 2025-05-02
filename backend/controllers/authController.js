const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    // Check if user exists
    const users = await User.findUserByEmail(email);

    if (users.length > 0) {
      return res.status(409).json({ error: "Email already registered." });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Insert user
    await User.createUser(name, username, email, hashedPassword);
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const users = await User.findUserByEmail(email);
    if (users.length === 0) {
      return res.status(401).json({ error: "User's email not found." });
    }
    if (users.length > 1) {
      return res.status(401).json({ error: "Error: Multiple users found." });
    }
    const user = users[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Password incorrect" });
    }
    // Generate JWT
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.json({
      token,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
