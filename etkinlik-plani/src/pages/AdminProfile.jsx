import React, { useEffect, useState } from "react";
import api from "../utils/api";

const AdminProfile = () => {
    const [users, setUsers] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchAdminData = async () => {
            try {
                const [usersResponse, eventsResponse] = await Promise.all([
                    api.get("/admin/users"),
                    api.get("/admin/events"),
                ]);
                setUsers(usersResponse.data);
                setEvents(eventsResponse.data);
            } catch (error) {
                console.error("Yönetim verileri yüklenemedi:", error);
            }
        };

        fetchAdminData();
    }, []);

    return (
        <div>
            <h1>Admin Profili</h1>
            <h2>Kullanıcı Yönetimi</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
            <h2>Etkinlik Yönetimi</h2>
            <ul>
                {events.map((event) => (
                    <li key={event.id}>{event.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default AdminProfile;
