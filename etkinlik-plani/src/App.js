import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import EventPage from "./pages/EventPage";
import ChatPage from "./pages/ChatPage";
import UserProfile from "./pages/UserProfile";
import AdminProfile from "./pages/AdminProfile";
import LoginPage from "./pages/LoginPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/event/:id" element={<EventPage />} />
                <Route path="/chat" element={<ChatPage />} />
                <Route path="/profile" element={<UserProfile />} />
                <Route path="/admin" element={<AdminProfile />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    );
}

export default App;
