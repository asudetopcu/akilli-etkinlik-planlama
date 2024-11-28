const jwt = require("jsonwebtoken");

exports.protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return res.status(401).json({ message: "Token bulunamadı." });
    }

    try {
        // Token'ı doğrulama
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Kullanıcı bilgilerini ekle
        next();
    } catch (error) {
        res.status(401).json({ message: "Token geçersiz." });
    }
};
