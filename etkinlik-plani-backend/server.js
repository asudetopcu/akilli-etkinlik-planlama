const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models"); // Sequelize bağlantısı

dotenv.config();

const app = express();

// Middleware'ler
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // CORS Middleware'ini kullanıyoruz

// SQLite veritabanı bağlantısı
(async () => {
    try {
        await sequelize.authenticate(); // Veritabanı bağlantısını test et
        console.log("SQLite veritabanı bağlandı!");

        // Tabloları eşitle
        await sequelize.sync({ alter: true });
        console.log("Veritabanı tabloları eşitlendi!");
    } catch (error) {
        console.error("SQLite bağlantı hatası:", error);
    }
})();

// Rotalar
const authRoutes = require("./routes/authRoutes"); // Auth rotaları
const eventRoutes = require("./routes/eventRoutes"); // Etkinlik rotaları
const messageRoutes = require("./routes/messageRoutes"); // Mesajlaşma rotaları

// Rotaları kullanıma aç
app.use("/api/auth", authRoutes); // /api/auth -> register ve login işlemleri
app.use("/api/events", eventRoutes); // /api/events -> etkinlik işlemleri
app.use("/api/messages", messageRoutes); // /api/messages -> mesajlaşma işlemleri

// Sunucu başlatma
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor.`));
