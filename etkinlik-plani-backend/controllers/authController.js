const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); 
const { validationResult } = require('express-validator'); 

exports.register = async (req, res) => {
    const {
        username,
        email,
        password,
        firstName,
        lastName,
        birthDate,
        gender,
        phoneNumber,
        profilePicture,
        interests,
    } = req.body;

    try {
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: "Bu e-posta adresi zaten kayıtlı." });
        }

        const hashedPassword = await bcrypt.hash(password, 10); 
        const formattedInterests = interests
            ? JSON.stringify(interests.split(",").map((item) => item.trim()))
            : "[]";

        const user = await User.create({
            username,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            birthDate,
            gender,
            phoneNumber,
            profilePicture: profilePicture || null,
            interests: formattedInterests, 
        });

        res.status(201).json({ message: "Kayıt başarılı!", user });
    } catch (error) {
        if (error.name === "SequelizeUniqueConstraintError") {
            const errors = error.errors.map((err) => ({
                field: err.path,
                message: `${err.path} benzersiz olmalı: ${err.value}`,
            }));
            return res.status(400).json({
                message: "Kayıt başarısız. Kullanıcı adı benzersiz olmalı.",
                errors,
            });
        }

        if (error.name === "SequelizeValidationError") {
            const errors = error.errors.map((err) => ({
                field: err.path,
                message: err.message,
            }));
            return res.status(400).json({
                message: "Doğrulama hatası oluştu.",
                errors,
            });
        }

        console.error("Hata detayları:", error.message || error);
        return res.status(500).json({
            message: "Kayıt sırasında bir hata oluştu.",
            details: error.message || error,
        });
    }
};



exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Geçersiz şifre." });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu: " + error.message });
    }
};


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
    },
});


exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Şifre başarıyla güncellendi." });
    } catch (error) {
        if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {
            return res.status(400).json({ message: "Geçersiz veya süresi dolmuş token." });
        }

        console.error("Şifre sıfırlama hatası:", error);
        res.status(500).json({ message: "Bir hata oluştu. Lütfen tekrar deneyin." });
    }
};

const updatePasswords = async () => {
    const users = await User.findAll();

    for (let user of users) {
        if (!user.password.startsWith("$2b$")) { 
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save();
        }
    }

    console.log("Tüm şifreler hashlenmiş ve güncellenmiştir.");
};

exports.forgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Bu e-posta ile kayıtlı kullanıcı bulunamadı." });
        }

        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

        await transporter.sendMail({
            from: process.env.EMAIL_USER, 
            to: email, 
            subject: "Şifre Sıfırlama Talebi",
            html: `<p>Şifre sıfırlama talebiniz alındı. Yeni şifre belirlemek için aşağıdaki bağlantıya tıklayın:</p>
                   <a href="${resetLink}">${resetLink}</a>`,
        });

        res.status(200).json({ message: "Şifre sıfırlama bağlantısı gönderildi. E-posta adresinizi kontrol edin." });
    } catch (error) {
        console.error("E-posta gönderme hatası:", error);
        res.status(500).json({ message: "E-posta gönderilirken bir hata oluştu." });
    }
};


exports.updateProfile = async (req, res) => {
    const userId = req.user.id;  
    const { username, email, location, interests, firstName, lastName, phoneNumber, profilePicture } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    user.username = username || user.username;
    user.email = email || user.email;
    user.location = location || user.location;
    user.interests = interests || user.interests;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profilePicture = profilePicture || user.profilePicture;

    await user.save();

    res.status(200).json({ message: "Profil başarıyla güncellendi.", user });
};

