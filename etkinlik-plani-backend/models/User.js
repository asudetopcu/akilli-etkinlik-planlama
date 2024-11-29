const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "User",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        interests: { type: DataTypes.TEXT }, // JSON string olarak tutuyoruz
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        birthDate: { type: DataTypes.DATE },
        gender: { type: DataTypes.ENUM("Male", "Female", "Other") },
        phoneNumber: { type: DataTypes.STRING },
        profilePicture: { type: DataTypes.STRING },
    },
    { timestamps: true }
);

module.exports = User;
