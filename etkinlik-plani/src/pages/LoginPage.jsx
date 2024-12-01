import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./LoginPage.css";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState(""); 
    const [error, setError] = useState(""); 
    const navigate = useNavigate(); 

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", {
                email,
                password,
            });
    
            console.log("Gelen yanıt:", response.data);
    
            if (response.data.token) {
                localStorage.setItem("token", response.data.token);

                alert("Giriş başarılı!");
                navigate("/homepage");
            } else {
                setError("Geçersiz kullanıcı bilgileri."); 
            }
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
                    {error && <p className="login-error">{error}</p>} {}
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
