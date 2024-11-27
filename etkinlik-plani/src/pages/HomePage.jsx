import React, { useEffect, useState } from "react";
import api from "../utils/api";

const HomePage = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await api.get("/events"); // Tüm etkinlikleri al
                setEvents(response.data);
            } catch (error) {
                console.error("Etkinlikler yüklenemedi:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div>
            <h1>Önerilen Etkinlikler</h1>
            <button>Etkinlik Ekle</button>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>
                        <h3>{event.name}</h3>
                        <p>{event.description}</p>
                        <p>{event.date} - {event.time}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HomePage;
