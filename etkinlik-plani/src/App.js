import React, { useEffect } from "react"; // useEffect'i buradan import edin
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import ChatPage from "./pages/ChatPage";
import UserProfile from "./pages/UserProfile";
import AdminProfile from "./pages/AdminProfile";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPassword from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";


const App = () => {

    useEffect(() => {
        const token = localStorage.getItem("authToken");
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }
    }, []);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/event/:id" element={<EventPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/admin" element={<AdminProfile />} />
                <Route path="/homepage" element={<HomePage />}/>
                <Route path="/forgot-password" element={<ForgotPassword/>}/>
                <Route path="/reset-password" element={<ResetPasswordPage />} />
            </Routes>
        </Router>
    );
};

export default App;
