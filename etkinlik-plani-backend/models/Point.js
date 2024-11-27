const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Point = sequelize.define("Point", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        references: {
            model: "Users",
            key: "id"
        }
    },
    points: { type: DataTypes.INTEGER, allowNull: false },
}, { timestamps: true });


module.exports = Point;
