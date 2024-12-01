const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const { getUserProfile, updateUserProfile } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const userController = require("../controllers/userController");
router.post("/register", authController.register); // authController içindeki register fonksiyonunu kullanır
router.post("/login", authController.login); // authController içindeki login fonksiyonunu kullanır


router.get("/profile", authMiddleware.authMiddleware, userController.getUserProfile);

router.put("/profile", authMiddleware.authMiddleware, userController.updateUserProfile);

module.exports = router;
