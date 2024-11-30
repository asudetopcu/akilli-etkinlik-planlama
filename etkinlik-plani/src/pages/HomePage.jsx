import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import { Link } from "react-router-dom"; // Profil sayfasına yönlendirme için kullanıyoruz

const HomePage = () => {
    const [events, setEvents] = useState([]);
    const [user, setUser] = useState({}); // Kullanıcı bilgileri

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

    // Kullanıcı bilgilerini API'den çek
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/user/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setUser(response.data);
            } catch (error) {
                console.error("Kullanıcı bilgileri alınamadı:", error);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="home-container">
            {/* Profil Kısmı */}
            <header className="profile-header">
                {user.profilePicture ? (
                    <img
                        src={user.profilePicture}
                        alt="Profil Fotoğrafı"
                        className="profile-picture"
                    />
                ) : (
                    <img
                        src="https://via.placeholder.com/50"
                        alt="Varsayılan Profil"
                        className="profile-picture"
                    />
                )}
                <Link to="/profile" className="profile-link">
                    Profilim
                </Link>
            </header>

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
                                <p>
                                    {event.date} - {event.time}
                                </p>
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
