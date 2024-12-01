const sequelize = require("../config/database");
const User = require("./User");
const Event = require("./Event");
const Participant = require("./Participant");
const Message = require("./Message");
const Point = require("./Point");

User.hasMany(Event, { foreignKey: "createdBy" });
Event.belongsTo(User, { foreignKey: "createdBy" });

User.hasMany(Participant, { foreignKey: "userId" });
Event.hasMany(Participant, { foreignKey: "eventId" });
Participant.belongsTo(User, { foreignKey: "userId" });
Participant.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(Message, { foreignKey: "senderId" });
User.hasMany(Message, { foreignKey: "receiverId" });
Message.belongsTo(User, { foreignKey: "senderId" });
Message.belongsTo(User, { foreignKey: "receiverId" });
Message.belongsTo(Event, { foreignKey: "eventId" });

User.hasMany(Point, { foreignKey: "userId" });
Point.belongsTo(User, { foreignKey: "userId" });

module.exports = { sequelize, User, Event, Participant, Message, Point };
