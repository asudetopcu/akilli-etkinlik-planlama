const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Veritabanı bağlantısı

// Kullanıcı Modeli
const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING },
    interests: { type: DataTypes.JSON },
    firstName: { type: DataTypes.STRING },
    lastName: { type: DataTypes.STRING },
    birthDate: { type: DataTypes.DATE },
    gender: { type: DataTypes.ENUM("Male", "Female", "Other") },
    phoneNumber: { type: DataTypes.STRING },
    profilePicture: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM("user", "admin"), defaultValue: "user" }
}, { timestamps: true });

// Etkinlik Modeli
const Event = sequelize.define("Event", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT },
    date: { type: DataTypes.DATE, allowNull: false },
    time: { type: DataTypes.TIME, allowNull: false },
    duration: { type: DataTypes.INTEGER },
    location: { type: DataTypes.STRING },
    category: { type: DataTypes.STRING }
});

// Katılımcılar Modeli
const Participant = sequelize.define("Participant", {
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    eventId: { type: DataTypes.INTEGER, references: { model: Event, key: 'id' }}
});

// Mesajlar Modeli
const Message = sequelize.define("Message", {
    senderId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    receiverId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    messageText: { type: DataTypes.TEXT, allowNull: false },
    sendTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

// Puanlar Modeli
const Score = sequelize.define("Score", {
    userId: { type: DataTypes.INTEGER, references: { model: User, key: 'id' }},
    score: { type: DataTypes.INTEGER, allowNull: false },
    awardedAt: { type: DataTypes.DATE, allowNull: false }
});

// Tabloları Eşitleme
(async () => {
    try {
        await sequelize.sync({ alter: true }); // Tabloları eşitleme
        console.log("Veritabanı tabloları eşitlendi!");
    } catch (error) {
        console.error("Veritabanı hatası:", error);
    }
})();
