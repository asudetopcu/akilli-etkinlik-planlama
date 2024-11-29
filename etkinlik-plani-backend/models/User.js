const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define(
    "User",
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: DataTypes.STRING, allowNull: false, unique: true },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        location: { type: DataTypes.STRING },
        interests: { type: DataTypes.TEXT }, // İlgi alanlarını JSON string olarak tutmak için TEXT
        firstName: { type: DataTypes.STRING },
        lastName: { type: DataTypes.STRING },
        birthDate: { type: DataTypes.DATE },
        gender: { type: DataTypes.ENUM("Male", "Female", "Other") },
        phoneNumber: { type: DataTypes.STRING },
        profilePicture: { type: DataTypes.STRING },
        role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" },
    },
    { timestamps: true }
);


module.exports = User;
