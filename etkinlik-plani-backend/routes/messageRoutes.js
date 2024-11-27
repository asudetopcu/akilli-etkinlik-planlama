const express = require("express");
const { sendMessage, getMessages } = require("../controllers/messageController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Mesaj gönderme
router.post("/", protect, sendMessage);

// Belirli bir etkinliğin mesajlarını getirme
router.get("/:eventId", protect, getMessages);

module.exports = router;
