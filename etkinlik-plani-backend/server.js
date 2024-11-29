const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");

dotenv.config();

const app = express();

// Middleware'ler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000", // Frontend adresi
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

// Veritabanı bağlantısı
(async () => {
    try {
        await sequelize.authenticate();
        console.log("SQLite veritabanı bağlandı!");

        // Tabloları eşitle
        await sequelize.sync({ alter: true });
        console.log("Veritabanı tabloları eşitlendi!");
    } catch (error) {
        console.error("SQLite bağlantı hatası:", error);
    }
})();

// Rotalar
const authRoutes = require("./routes/authRoutes"); // Authentication rotaları

// Rotaları kullanıma aç
app.use("/api/auth", authRoutes);

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor.`));
