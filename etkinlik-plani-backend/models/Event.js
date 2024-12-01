const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Event = sequelize.define("Event", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATEONLY, allowNull: false },
    time: { type: DataTypes.TIME },
    duration: { type: DataTypes.INTEGER }, 
    location: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING },
    createdBy: { 
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false,
        references: {
            model: "Users", 
            key: "id"
        }
    },
}, { timestamps: true });

module.exports = Event;
