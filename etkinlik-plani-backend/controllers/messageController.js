const Message = require("../models/Message");

exports.sendMessage = async (req, res) => {
    try {
        const { eventId, content } = req.body;
        const senderId = req.user.id; 

        const newMessage = await Message.create({ eventId, senderId, content });
        res.status(201).json({ message: "Mesaj başarıyla gönderildi.", newMessage });
    } catch (error) {
        res.status(500).json({ message: "Mesaj gönderilirken hata oluştu.", error: error.message });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { eventId } = req.params;

        const messages = await Message.findAll({ where: { eventId } });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "Mesajlar alınırken hata oluştu.", error: error.message });
    }
};
