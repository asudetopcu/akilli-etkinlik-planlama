const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { sequelize } = require("./models");

dotenv.config(); 

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: "http://localhost:3000",
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, 
    })
);

(async () => {
    try {
        await sequelize.authenticate();
        console.log("SQLite veritabanı bağlandı!");

        await sequelize.sync({ alter: true }); 
        console.log("Veritabanı tabloları eşitlendi!");
    } catch (error) {
        console.error("SQLite bağlantı hatası:", error);
    }
})();

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const eventRoutes = require("./routes/eventRoutes");

app.use("/api/auth", authRoutes); 

app.use("/api/user", userRoutes); 
app.use("/api/events", eventRoutes);

app.use((req, res) => {
    res.status(404).json({ message: "Rota bulunamadı." });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
