const Event = require("../models/Event");
const Participant = require("../models/Participant");



exports.getAllEvents = async (req, res) => {
    try {
        console.log("Event model:", Event);

        const events = await Event.findAll();

        if (!events || events.length === 0) {
            return res.status(404).json({ message: "Etkinlik bulunamadı." });
        }

        res.status(200).json(events);
    } catch (error) {
        console.error("Etkinlikleri alırken hata oluştu:", error.message);
        res.status(500).json({
            message: "Etkinlikleri alırken bir hata oluştu.",
            error: error.message,
        });
    }
};



exports.createEvent = async (req, res) => {
    try {
        const { name, description, date, time, location, category } = req.body;

        const userId = 1;

        const newEvent = await Event.create({
            name,
            description,
            date,
            time,
            location,
            category,
            createdBy: userId, 
        });

        res.status(201).json({ message: "Etkinlik başarıyla oluşturuldu.", event: newEvent });
    } catch (error) {
        console.error("Etkinlik oluşturulurken hata:", error.message);
        res.status(500).json({ message: "Etkinlik oluşturulurken hata oluştu.", error: error.message });
    }
};


exports.updateEvent = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, date } = req.body;

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


exports.getEventById = async (req, res) => {
    try {
        const { id } = req.params;

        const event = await Event.findByPk(id);

        if (!event) {
            return res.status(404).json({ message: "Etkinlik bulunamadı." });
        }

        res.status(200).json(event);
    } catch (error) {
        console.error("Etkinlik detayları alınırken hata oluştu:", error.message);
        res.status(500).json({ message: "Etkinlik alınırken hata oluştu.", error: error.message });
    }
};

exports.joinEvent = async (req, res) => {
    try {
        const userId = req.user.id; 
        const eventId = req.params.id;

        const existingParticipant = await Participant.findOne({
            where: { userId, eventId },
        });

        if (existingParticipant) {
            return res.status(400).json({ message: "Bu etkinliğe zaten katıldınız." });
        }

        const newParticipant = await Participant.create({ userId, eventId });

        res.status(201).json({ message: "Etkinliğe başarıyla katıldınız.", participant: newParticipant });
    } catch (error) {
        console.error("Etkinliğe katılım sırasında hata oluştu:", error);
        res.status(500).json({ message: "Etkinliğe katılırken bir hata oluştu.", error: error.message });
    }
};
