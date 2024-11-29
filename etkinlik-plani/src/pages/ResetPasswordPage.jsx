import React, { useState } from "react";
import axios from "axios";
import "./ResetPasswordPage.css";

const ResetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search); // Token'ı URL'den alıyoruz
        const token = urlParams.get("token");

        if (!token) {
            alert("Geçersiz veya eksik token.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("Şifreler eşleşmiyor.");
            return;
        }

        try {
            await axios.post("http://localhost:5000/api/reset-password", {
                token,
                newPassword,
            });
            setMessage("Şifre başarıyla güncellendi. Şimdi giriş yapabilirsiniz.");
        } catch (error) {
            setMessage(error.response?.data?.message || "Hata oluştu.");
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-box">
                <h1 className="reset-title">Yeni Şifre Belirle</h1>
                <form className="reset-form" onSubmit={handleResetPassword}>
                    <input
                        type="password"
                        placeholder="Yeni Şifre"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="reset-input"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Yeni Şifreyi Onayla"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="reset-input"
                        required
                    />
                    <button type="submit" className="reset-button">
                        Şifreyi Güncelle
                    </button>
                </form>
                {message && <p className="reset-message">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;