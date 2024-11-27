const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME },
    duration: { type: DataTypes.INTEGER }, // Dakika cinsinden
    location: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    createdBy: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: "Users", // İlişki User tablosuna
            key: "id"
        }
    },
}, { timestamps: true });

module.exports = Event;
