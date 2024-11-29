import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";

const HomePage = () => {
    const [events, setEvents] = useState([]);

    // Etkinlikleri API'den çek
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/events");
                setEvents(response.data);
            } catch (error) {
                console.error("Etkinlikler yüklenemedi:", error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="home-container">
            {/* Hero Banner */}
            <div className="hero-banner">
                <h1>Keşfet, Katıl ve Eğlen!</h1>
                <p>Favori etkinliklerinizi bulun ve sosyal hayatınızı renklendirin.</p>
            </div>

            {/* Etkinlik Kartları */}
            <div className="event-list">
                <h2>Popüler Etkinlikler</h2>
                <div className="event-grid">
                    {events.map((event) => (
                        <div className="event-card" key={event.id}>
                            <img
                                src={event.imageUrl}
                                alt={event.name}
                                className="event-image"
                            />
                            <div className="event-info">
                                <h3>{event.name}</h3>
                                <p>{event.date} - {event.time}</p>
                                <p>{event.location}</p>
                                <button className="detail-btn">Detayları Gör</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
