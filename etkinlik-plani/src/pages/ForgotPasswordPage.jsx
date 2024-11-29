import React, { useState } from "react";
import axios from "axios";
import "./ForgotPasswordPage.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
    
        try {
            await axios.post("http://localhost:5000/api/auth/forgot-password", { email });

            alert("Şifre sıfırlama bağlantısı gönderildi. E-posta adresinizi kontrol edin.");
        } catch (error) {
            alert("Hata oluştu: " + (error.response?.data?.message || "Bilinmeyen bir hata oluştu."));
        }
    };
    

    return (
        <div className="forgot-container">
            <div className="forgot-box">
                <h1 className="forgot-title">Şifremi Unuttum</h1>
                <p className="forgot-description">Şifre sıfırlama talimatları için e-posta adresinizi girin.</p>
                <form className="forgot-form" onSubmit={handleForgotPassword}>
                    <input
                        type="email"
                        placeholder="E-posta Adresi"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="forgot-input"
                        required
                    />
                    <button type="submit" className="forgot-button">
                        Gönder
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ForgotPassword;
