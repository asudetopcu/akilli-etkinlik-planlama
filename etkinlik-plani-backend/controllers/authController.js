const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Kullanıcı modelimiz
const { validationResult } = require('express-validator'); // Veritabanı kayıtlarını doğrulamak için

exports.register = async (req, res) => {
    try {
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
            interests: JSON.stringify(formattedInterests),
        });
    } catch (error) {
        console.error("Validation hatası detayları:", error.errors); // Validation hatalarını logla
        return res.status(500).json({
            message: "Kayıt sırasında bir hata oluştu.",
            details: error.errors,
        });
    }
};



exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Kullanıcıyı email ile bul
        const user = await User.findOne({ where: { email } });
        if (!user) {
            console.log("Kullanıcı bulunamadı:", email);
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }


        // Şifreyi kontrol et
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Gelen şifre:", password);
        console.log("Veritabanındaki şifre:", user.password);
        console.log("Şifre doğrulama sonucu:", isPasswordValid);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Geçersiz şifre." });
        }

        // Token oluştur
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ message: "Bir hata oluştu: " + error.message });
    }
};


exports.resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        // Token doğrulama
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

        // Yeni şifreyi hash'le
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Şifre başarıyla sıfırlandı." });
    } catch (error) {
        res.status(500).json({ message: "Hata: " + error.message });
    }
};


const updatePasswords = async () => {
    const users = await User.findAll();

    for (let user of users) {
        try {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            user.password = hashedPassword;
            await user.save();
        } catch (error) {
            console.error(`Hata: ${user.id} için şifre güncellenemedi:`, error.message);
        }
    }

    console.log("Tüm şifreler hashlenmiş ve güncellenmiştir.");
};

updatePasswords();


updatePasswords();

exports.resetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    // Kullanıcıyı kontrol et
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: "Kullanıcı bulunamadı." });

    // Şifre sıfırlama tokeni oluştur
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "15m" });

    // Şifre sıfırlama bağlantısını e-posta ile gönderme (burada sadece log yazıyoruz)
    console.log(`Şifre sıfırlama bağlantısı: http://localhost:3000/reset-password/${resetToken}`);

    res.status(200).json({ message: "Şifre sıfırlama bağlantısı e-posta adresinize gönderildi." });
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

