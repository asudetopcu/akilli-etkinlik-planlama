const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite",
    logging: false,
    dialectOptions: {
        mode: require("sqlite3").OPEN_READWRITE | require("sqlite3").OPEN_CREATE
    }
});

module.exports = sequelize;
