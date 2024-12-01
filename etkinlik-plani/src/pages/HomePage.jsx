import React, { useState, useEffect } from "react";
import "./HomePage.css";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
    const [user, setUser] = useState({}); 
    const [events, setEvents] = useState([]);

    const [newEvent, setNewEvent] = useState({
        name: "",
        date: "",
        time: "",
        description: "",
        location: "",
        category: "",
    });

    




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


const handleAddEvent = async (e) => {
    e.preventDefault();
    try {

        const response = await axios.post("http://localhost:5000/api/events", newEvent, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });


        setEvents([...events, response.data.event]); 

        alert("Etkinlik başarıyla eklendi!");

        setNewEvent({
            name: "",
            date: "",
            time: "",
            description: "",
            location: "",
            category: "",
        });
    } catch (error) {
        console.error("Etkinlik eklenemedi:", error);
        alert("Etkinlik eklenirken bir hata oluştu.");
    }
};


    return (
        <div className="home-container">
            
            {}
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

            {}
            <div className="hero-banner">
                <h1>Keşfet, Katıl ve Eğlen!</h1>
                <p>Favori etkinliklerinizi bulun ve sosyal hayatınızı renklendirin.</p>
            </div>

            {}
            <div className="popular-events">
                <h2>Popüler Etkinlikler</h2>
                <div className="event-carousel">
                    {events.slice(0, 10).map((event, index) => (
                        <div className="carousel-slide" key={event.id}>
                            <div className="event-card">
                                <h3>{event.name}</h3>
                                <p>{event.description}</p>
                                <Link to={`/events/${event.id}`} className="detail-button">
                                    Detayları Gör
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {}
            <div className="add-event">
                <h2>Etkinlik Ekle</h2>
                <form onSubmit={handleAddEvent} className="add-event-form">
                    <input
                        type="text"
                        placeholder="Etkinlik Adı"
                        value={newEvent.name}
                        onChange={(e) => setNewEvent({ ...newEvent, name: e.target.value })}
                        required
                    />
                    <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
                        required
                    />
                    <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Açıklama"
                        value={newEvent.description}
                        onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                        required
                    ></textarea>
                    <input
                        type="text"
                        placeholder="Konum"
                        value={newEvent.location}
                        onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Kategori"
                        value={newEvent.category}
                        onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
                        required
                    />
                    <button type="submit" className="add-event-button">
                        Etkinlik Ekle
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HomePage;
