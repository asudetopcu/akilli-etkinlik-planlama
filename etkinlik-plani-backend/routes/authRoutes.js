const express = require("express");
const { register, login, resetPassword, updateUserProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/reset-password", resetPassword);
router.put("/update-profile", protect, updateUserProfile);

module.exports = router;
