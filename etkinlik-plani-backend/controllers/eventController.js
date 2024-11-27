const Event = require("../models/Event");

exports.getAllEvents = async (req, res) => {
    try {
        const events = [
            { id: 1, name: "Etkinlik 1", date: "2024-11-25" },
            { id: 2, name: "Etkinlik 2", date: "2024-12-01" },
        ];
        res.status(200).json(events);
    } catch (error) {
        res.status(500).json({ message: "Etkinlikleri alırken hata oluştu." });
    }
};

exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, time, duration, location, category } = req.body;
        const createdBy = req.user.id; // Middleware'den gelen kullanıcı ID

        const newEvent = await Event.create({
            name,
            description,
            date,
            time,
            duration,
            location,
            category,
            createdBy,
        });

        res.status(201).json({ message: "Etkinlik başarıyla oluşturuldu.", event: newEvent });
    } catch (error) {
        res.status(500).json({ message: "Etkinlik oluşturulurken hata oluştu.", error: error.message });
    }
};

exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date } = req.body;

        // Burada örnek başarı mesajı döndürülüyor
        res.status(200).json({ message: `Etkinlik ${id} başarıyla güncellendi.`, updatedEvent: { id, name, date } });
    } catch (error) {
        res.status(500).json({ message: "Etkinlik güncellenirken hata oluştu." });
    }
};

exports.deleteEvent = async (req, res) => {
    try {
        const { id } = req.params;
        res.status(200).json({ message: `Etkinlik ${id} başarıyla silindi.` });
    } catch (error) {
        res.status(500).json({ message: "Etkinlik silinirken hata oluştu." });
    }
};
