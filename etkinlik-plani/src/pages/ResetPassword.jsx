import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ResetPasswordPage.css";

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:3000/api/reset-password", { token, newPassword });
            alert("Şifreniz başarıyla sıfırlandı. Giriş yapabilirsiniz.");
        } catch (error) {
            alert(error.response?.data?.message || "Hata oluştu.");
        }
    };

    return (
        <div className="reset-container">
            <div className="reset-box">
                <h1 className="reset-title">Şifreyi Sıfırla</h1>
                <p className="reset-description">Yeni şifrenizi belirleyin.</p>
                <form className="reset-form" onSubmit={handleResetPassword}>
                    <input
                        type="password"
                        placeholder="Yeni Şifre"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="reset-input"
                        required
                    />
                    <button type="submit" className="reset-button">
                        Şifreyi Sıfırla
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ResetPassword;
