import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const EventPage = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await api.get(`/events/${id}`); // Etkinlik detayını al
                setEvent(response.data);
            } catch (error) {
                console.error("Etkinlik yüklenemedi:", error);
            }
        };

        fetchEvent();
    }, [id]);

    if (!event) return <p>Yükleniyor...</p>;

    return (
        <div>
            <h1>{event.name}</h1>
            <p>{event.description}</p>
            <p>{event.date} - {event.time}</p>
            <p>Konum: {event.location}</p>
            <p>Kategori: {event.category}</p>
        </div>
    );
};

export default EventPage;
