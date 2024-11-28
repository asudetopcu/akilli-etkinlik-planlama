import React, { useState } from "react";
import axios from "axios";
import "./ForgotPasswordPage.css";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/reset-password-request", { email });
            alert("Şifre sıfırlama talimatları e-postanıza gönderildi.");
        } catch (error) {
            alert(error.response?.data?.message || "Hata oluştu.");
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
