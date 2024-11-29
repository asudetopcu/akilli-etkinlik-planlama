const express = require("express");
const { register, login, resetPassword, resetPasswordRequest, updateProfile } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");
const authController = require("../controllers/authController");
const router = express.Router();

// Kullanıcı kayıt
router.post("/register", register);


// Kullanıcı giriş
router.post("/login", authController.login);
router.post("/reset-password-request", authController.resetPasswordRequest); // Şifre sıfırlama talebi
router.post("/reset-password", authController.resetPassword);  

// Kullanıcı profil güncelleme (Yetki gerektirir)
router.put("/update-profile", protect, authController.updateProfile);

module.exports = router;
