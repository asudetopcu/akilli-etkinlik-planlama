const express = require("express");
const {
    register,
    login,
    resetPassword,
    forgotPassword,
} = require("../controllers/authController");
const router = express.Router();

// Kayıt olma
router.post("/register", register);

// Giriş yapma
router.post("/login", login);

// Şifre sıfırlama talebi
router.post("/forgot-password", forgotPassword);


// Şifre sıfırlama
router.post("/reset-password", resetPassword);

module.exports = router;
