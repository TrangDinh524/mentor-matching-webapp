const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const authMiddleware = require("./middleware/authMiddleware");
const browseRoutes = require("./routes/browse");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_PROD_URL || "http://localhost:4000",
    credentials: true,
  })
);

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Mentorship Matching Platform API is running!");
});
app.use("/api/auth", authRoutes);

// Protected routes
app.use("/api/profile", authMiddleware, profileRoutes);
app.use("/api/browse", authMiddleware, browseRoutes);

module.exports = app;
