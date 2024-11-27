const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Message = sequelize.define("Message", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    senderId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    receiverId: { 
        type: DataTypes.INTEGER,
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
    content: { type: DataTypes.TEXT, allowNull: false },
    sentAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { timestamps: true });


module.exports = Message;
