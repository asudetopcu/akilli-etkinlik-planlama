const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {
    try {
        console.log("Gelen Veri:", req.body);

        const { username, email, password } = req.body;

        const userExists = await User.findOne({ where: { email } });
        if (userExists) return res.status(400).json({ message: "Email zaten kayıtlı." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, email, password: hashedPassword });
        console.log("Kayıtlı Kullanıcı:", user);

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(201).json({ user, token });
    } catch (error) {
        console.error("Hata Oluştu:", error); 
        res.status(500).json({ message: "Hata: " + error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Geçersiz şifre." });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Hata: " + error.message });
    }
};

exports.resetPassword = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Şifre başarıyla sıfırlandı." });
    } catch (error) {
        res.status(500).json({ message: "Hata: " + error.message });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const { username, email, location, interests } = req.body;

        const user = await User.findByPk(userId);
        if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

        user.username = username || user.username;
        user.email = email || user.email;
        user.location = location || user.location;
        user.interests = interests || user.interests;

        await user.save();

        res.status(200).json({ message: "Profil güncellendi.", user });
    } catch (error) {
        res.status(500).json({ message: "Hata: " + error.message });
    }
};
