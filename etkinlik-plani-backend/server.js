const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// SQLite veritabanı bağlantısı
(async () => {
    try {
        await sequelize.authenticate(); // Veritabanı bağlantısını test et
        console.log("SQLite veritabanı eşitlendi!");

        // Tabloları eşitle
        await sequelize.sync({ alter: true });
        console.log("Veritabanı tabloları eşitlendi!");
    } catch (error) {
        console.error("SQLite bağlantı hatası:", error);
    }
})();

// Rotalar
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/messages", messageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Sunucu ${PORT} portunda çalışıyor`));
