const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Participant = sequelize.define("Participant", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    eventId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: "Events",
            key: "id"
        }
    },
}, { timestamps: true });


module.exports = Participant;
