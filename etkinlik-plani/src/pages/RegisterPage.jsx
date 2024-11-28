import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./RegisterPage.css";

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        location: "",
        interests: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        gender: "",
        phoneNumber: "",
        profilePicture: "",
        role: "user"
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };


    const handleRegister = async (e) => {
        e.preventDefault();
    
        // Boş alan kontrolü
        for (const key in formData) {
            if (key !== "location" && key !== "interests" && !formData[key]) {
                alert(`${key} alanı boş bırakılamaz.`);
                return;
            }
        }
    
        try {
            const [day, month, year] = formData.birthDate.split("/");
            const formattedBirthDate = new Date(`${year}-${month}-${day}`).toISOString();
    
            const formattedData = {
                ...formData,
                birthDate: formattedBirthDate,
                interests: formData.interests
                    ? JSON.stringify(formData.interests.split(",").map((i) => i.trim()))
                    : JSON.stringify([]),
            };
    
            await axios.post("http://localhost:3000/api/auth/register", formattedData);
            alert("Kayıt başarılı!");
        } catch (error) {
            alert("Kayıt başarısız: " + (error.response?.data?.message || "Bilinmeyen hata."));
        }
    };
      
    return (
        <div className="register-container">
            <div className="register-box">
                <h1 className="register-title">Kayıt Ol</h1>
                <form className="register-form" onSubmit={handleRegister}>
                    <div className="form-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="Kullanıcı Adı"
                            className="register-input"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            className="register-input"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            name="password"
                            placeholder="Şifre"
                            className="register-input"
                            onChange={handleChange}
                            required
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Konum"
                            className="register-input"
                            onChange={handleChange}
                        />
                    </div>
                    <input
                        type="text"
                        name="interests"
                        placeholder="İlgi Alanları (Virgülle ayırın)"
                        className="register-input"
                        onChange={handleChange}
                    />
                    <div className="form-group">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="Ad"
                            className="register-input"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Soyad"
                            className="register-input"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="date"
                            name="birthDate"
                            className="register-input"
                            onChange={handleChange}
                        />
                        <select
                            name="gender"
                            className="register-input"
                            onChange={handleChange}
                        >
                            <option value="">Cinsiyet Seçin</option>
                            <option value="Male">Erkek</option>
                            <option value="Female">Kadın</option>
                            <option value="Other">Diğer</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            name="phoneNumber"
                            placeholder="Telefon Numarası"
                            className="register-input"
                            onChange={handleChange}
                        />
                        <input
                            type="text"
                            name="profilePicture"
                            placeholder="Profil Resmi URL'si"
                            className="register-input"
                            onChange={handleChange}
                        />
                    </div>
                    <select
                        name="role"
                        className="register-input"
                        onChange={handleChange}
                    >
                        <option value="user">Kullanıcı</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button type="submit" className="register-button">
                        Kayıt Ol
                    </button>
                </form>
                <p className="register-login-link">
                    Hesabınız var mı?{" "}
                    <span onClick={() => navigate("/")} className="link">
                        Giriş Yap
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
