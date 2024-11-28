import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // API çağrısı için axios'u import ediyoruz
import "./LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState(""); // Kullanıcı email state'i
    const [password, setPassword] = useState(""); // Kullanıcı şifre state'i
    const [error, setError] = useState(""); // Hata mesajını göstermek için
    const navigate = useNavigate(); // Sayfa yönlendirme fonksiyonu

    const handleLogin = async (e) => {
        e.preventDefault();

        // Form doğrulama: Email ve şifre kontrolü
        if (!email || !password) {
            setError("Email ve şifre boş bırakılamaz.");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                email,
                password, // Kullanıcıdan alınan düz metin şifre
            });

            alert("Giriş başarılı!");
            console.log("Gelen yanıt:", response.data); // Gelen yanıtı logla
            navigate("/homepage"); // Başarılı girişte yönlendirme
        } catch (error) {
            console.error("Hata:", error.response?.data?.message || "Bilinmeyen bir hata.");
            setError(error.response?.data?.message || "Giriş başarısız.");
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Hoş Geldiniz!</h1>
                <p className="login-subtitle">Hesabınıza giriş yapın ve etkinlikleri keşfedin.</p>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="login-error">{error}</p>} {/* Hata mesajı */}
                    <button type="submit" className="login-button">
                        Giriş Yap
                    </button>
                </form>
                <div className="login-links">
                    <button className="link-button" onClick={() => navigate("/register")}>
                        Kayıt Ol
                    </button>
                    <button className="link-button" onClick={() => navigate("/forgot-password")}>
                        Şifremi Unuttum
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
