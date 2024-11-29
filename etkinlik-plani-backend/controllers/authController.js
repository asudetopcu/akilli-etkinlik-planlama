const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Kullanıcı modelimiz
const { validationResult } = require('express-validator'); // Veritabanı kayıtlarını doğrulamak için

exports.register = async (req, res) => {
    const { username, email, password, firstName, lastName, birthDate, gender, phoneNumber, profilePicture, interests } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10); // Şifreyi hashle
        
        // İlgi alanlarını JSON string olarak formatla
        const formattedInterests = interests ? JSON.stringify(interests.split(",").map((item) => item.trim())) : "[]";

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
            interests: formattedInterests, // JSON string olarak kaydediyoruz
        });

        res.status(201).json({ message: "Kayıt başarılı!", user });
    } catch (error) {
        console.error("Validation hatası detayları:", error.errors || error.message); // Hata logları
        return res.status(500).json({
            message: "Kayıt sırasında bir hata oluştu.",
            details: error.errors || error.message,
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

        // İlgi alanlarını parse et
        const parsedInterests = JSON.parse(user.interests || "[]");

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({
            user: {
                id: user.id,
                username: user.username,
                email: user.email,
                interests: parsedInterests, // İlgi alanlarını parse edilmiş olarak döndür
            },
            token,
        });
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu: " + error.message });
    }
};



exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Şifre başarıyla güncellendi." });
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu: " + error.message });
    }
};

const updatePasswords = async () => {
    const users = await User.findAll();

    for (let user of users) {
        if (!user.password.startsWith("$2b$")) { // Zaten hashlenmiş mi kontrol et
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save();
        }
    }

    console.log("Tüm şifreler hashlenmiş ve güncellenmiştir.");
};


exports.resetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(404).json({ message: "Bu e-posta ile kayıtlı kullanıcı bulunamadı." });

        const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

        // Bu örnekte sıfırlama bağlantısını konsola yazıyoruz. E-posta ile gönderimi burada entegre edebilirsiniz.
        const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
        console.log(`Şifre sıfırlama bağlantısı: ${resetLink}`);

        res.status(200).json({ message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi." });
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu: " + error.message });
    }
};



exports.updateProfile = async (req, res) => {
    const userId = req.user.id;  // JWT ile alınan kullanıcı ID'si
    const { username, email, location, interests, firstName, lastName, phoneNumber, profilePicture } = req.body;

    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    // Kullanıcı bilgilerini güncelle
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

