import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./EventDetailsPage.css";

const EventDetailsPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isJoined, setIsJoined] = useState(false);

    useEffect(() => {
        const fetchEventDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(response.data);
                setLoading(false);
            } catch (err) {
                console.error("Etkinlik detayları alınamadı:", err);
                setError("Etkinlik bilgileri yüklenirken bir hata oluştu.");
                setLoading(false);
            }
        };

        fetchEventDetails();
    }, [id]);

    const handleJoinEvent = async () => {
        try {
            const response = await axios.post(
                `http://localhost:5000/api/events/${id}/join`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert(response.data.message);
            setIsJoined(true); 
        } catch (error) {
            console.error("Etkinliğe katılım sırasında hata oluştu:", error);
            alert("Etkinliğe katılırken bir hata oluştu.");
        }
    };

    if (loading) return <p>Yükleniyor...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="event-details-page">
            <div className="event-details-container">
                <h2>{event.name}</h2>
                <p className="event-description">{event.description}</p>
                <div className="event-info">
                    <p><strong>Tarih:</strong> {event.date}</p>
                    <p><strong>Saat:</strong> {event.time}</p>
                    <p><strong>Konum:</strong> {event.location}</p>
                    <p><strong>Kategori:</strong> {event.category}</p>
                </div>
                <button
                    className="join-button"
                    onClick={handleJoinEvent}
                    disabled={isJoined}
                >
                    {isJoined ? "Katıldınız" : "Katıl"}
                </button>
            </div>
        </div>
    );
};

export default EventDetailsPage;
