const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models"); // Veritabanı bağlantısı

dotenv.config(); // .env dosyasını yükle

const app = express(); // Express uygulamasını başlat

// Middleware'ler
app.use(express.json()); // JSON desteği
app.use(express.urlencoded({ extended: true })); // URL-encoded desteği
app.use(
    cors({
        origin: "http://localhost:3000", // Frontend adresi
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // Çerez paylaşımı
    })
);

// Veritabanı bağlantısı ve tabloları eşitleme
(async () => {
    try {
        await sequelize.authenticate(); // Veritabanı bağlantısını test et
        console.log("SQLite veritabanı bağlandı!");

        await sequelize.sync({ alter: true }); // Tabloları eşitle
        console.log("Veritabanı tabloları eşitlendi!");
    } catch (error) {
        console.error("SQLite bağlantı hatası:", error);
    }
})();

// Rotaları içe aktar
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");

// Rotaları tanımla
app.use("/api/auth", authRoutes); // Authentication işlemleri

app.use("/api/user", userRoutes); // Authentication işlemleri


// 404 Rotalar için hata yakalayıcı
app.use((req, res) => {
    res.status(404).json({ message: "Rota bulunamadı." });
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
