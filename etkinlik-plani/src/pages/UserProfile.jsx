import React, { useEffect, useState } from "react";
import api from "../utils/api";

const UserProfile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await api.get("/auth/profile");
                setUser(response.data);
            } catch (error) {
                console.error("Profil yüklenemedi:", error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!user) return <p>Yükleniyor...</p>;

    return (
        <div>
            <h1>Kullanıcı Profili</h1>
            <p>Adı: {user.firstName} {user.lastName}</p>
            <p>E-posta: {user.email}</p>
            <h2>Katıldığı Etkinlikler</h2>
            <ul>
                {user.participatedEvents.map((event) => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
