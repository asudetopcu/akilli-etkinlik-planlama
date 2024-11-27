const express = require("express");
const { createEvent, updateEvent, deleteEvent, getAllEvents } = require("../controllers/eventController");
const { protect } = require("../middlewares/authMiddleware");
const { isAdmin } = require("../middlewares/roleMiddleware");

const router = express.Router();

// Etkinlik oluşturma
router.post("/", protect, createEvent);

// Etkinlik güncelleme
router.put("/:id", protect, updateEvent);

// Etkinlik silme (admin yetkisi gerektirir)
router.delete("/:id", protect, isAdmin, deleteEvent);

// Tüm etkinlikleri listeleme
router.get("/", protect, getAllEvents);

module.exports = router;
