const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token eksik." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Token'i çöz
        console.log("Decoded Token:", decoded); // Token'in içerdiği verileri yazdırın

        const user = await User.findByPk(decoded.id); // Veritabanında kullanıcıyı bul
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        console.log("Authenticated User:", user.dataValues); // Bulunan kullanıcıyı yazdırın

        req.user = user; // Kullanıcıyı request'e ekle
        next(); // Bir sonraki middleware'e geç
    } catch (error) {
        console.error("Doğrulama hatası:", error);
        return res.status(401).json({ message: "Geçersiz token." });
    }
};

