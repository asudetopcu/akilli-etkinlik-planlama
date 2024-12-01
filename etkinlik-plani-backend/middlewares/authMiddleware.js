const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.authMiddleware = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token eksik." });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log("Decoded Token:", decoded); 

        const user = await User.findByPk(decoded.id); 
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        console.log("Authenticated User:", user.dataValues); 

        req.user = { id: user.id };
        next(); 
    } catch (error) {
        console.error("Doğrulama hatası:", error);
        return res.status(401).json({ message: "Geçersiz token." });
    }
};

exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1]; 
        if (!token) {
            return res.status(401).json({ message: "Yetkilendirme gerekli." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (error) {
        res.status(401).json({ message: "Geçersiz token." });
    }
};
