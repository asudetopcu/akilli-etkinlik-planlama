import React, { useEffect, useState } from "react";
import api from "../utils/api";

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get("/messages");
                setMessages(response.data);
            } catch (error) {
                console.error("Mesajlar yüklenemedi:", error);
            }
        };

        fetchMessages();
    }, []);

    const sendMessage = async () => {
        try {
            const response = await api.post("/messages", { content: newMessage });
            setMessages((prev) => [...prev, response.data]); 
            setNewMessage("");
        } catch (error) {
            console.error("Mesaj gönderilemedi:", error);
        }
    };

    return (
        <div>
            <h1>Sohbet Alanı</h1>
            <div className="chat-box">
                <ul>
                    {messages.map((msg) => (
                        <li key={msg.id}>
                            <strong>{msg.senderId}:</strong> {msg.content}
                        </li>
                    ))}
                </ul>
                <textarea 
                    placeholder="Mesaj yaz..." 
                    value={newMessage} 
                    onChange={(e) => setNewMessage(e.target.value)}
                ></textarea>
                <button onClick={sendMessage}>Gönder</button>
            </div>
        </div>
    );
};

export default ChatPage;
