const express = require("express");
const { createEvent, updateEvent, deleteEvent, getAllEvents, getEventById, joinEvent } = require("../controllers/eventController");
const { authenticate } = require("../middlewares/authMiddleware");

const { isAdmin } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/", createEvent); 
router.get("/", getAllEvents);
router.put("/:id", updateEvent); 
router.delete("/:id", isAdmin, deleteEvent); 
router.get("/:id", getEventById); 
router.post("/:id/join", authenticate, joinEvent); 
module.exports = router;
