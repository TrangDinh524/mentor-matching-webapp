const express = require("express");
const router = express.Router();
const browseController = require("../controllers/browseController");
const connectionController = require("../controllers/connectionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, browseController.getUsers);
router.post("/connect", authMiddleware, connectionController.sendRequest);

module.exports = router;
