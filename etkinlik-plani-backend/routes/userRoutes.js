const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

// Kullanıcı Kayıt ve Giriş İşlemleri
router.post("/register", authController.register); // authController içindeki register fonksiyonunu kullanır
router.post("/login", authController.login); // authController içindeki login fonksiyonunu kullanır

module.exports = router;
