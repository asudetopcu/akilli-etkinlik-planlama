const { Sequelize } = require("sequelize");
require("dotenv").config();

// Sequelize ile SQLite bağlantısı
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite", // Veritabanı dosyası
    logging: false, // Konsolda SQL sorgularını görmek istemiyorsanız false yapın
});

module.exports = sequelize;
