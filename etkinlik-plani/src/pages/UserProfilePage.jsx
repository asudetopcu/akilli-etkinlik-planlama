import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfilePage.css";

const UserProfile = () => {
  const [user, setUser] = useState({});
  const [editMode, setEditMode] = useState(false); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/user/profile", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            const parsedInterests = typeof response.data.interests === "string"
                ? JSON.parse(response.data.interests) 
                : response.data.interests || []; 

            setUser({ ...response.data, interests: parsedInterests });
            setLoading(false);
        } catch (err) {
            console.error("Hata:", err);
            setError("Kullanıcı bilgileri alınamadı.");
            setLoading(false);
        }
    };

    fetchUserProfile();
}, []);


  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        const updatedUser = {
            ...user,
            interests: user.interests || [], 
        };

        console.log("Gönderilen Veri:", updatedUser); 

        const response = await axios.put(
            "http://localhost:5000/api/user/profile",
            updatedUser,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                validateStatus: (status) => {
                    return status >= 200 && status < 300; 
                },
            }
        );

        console.log("Güncelleme Sonucu:", updatedUser);

        if (response.status === 200) {
            alert(response.data.message); 
            setEditMode(false); 
            window.location.href = "/profile"; 
        } else {
            alert("Beklenmeyen bir hata oluştu.");
        }
    } catch (err) {
        console.error("Hata Detayı:", err.response || err.message);
        alert("Profil güncellenirken bir hata oluştu.");
    }
};

  const formatDate = (date) => {
    if (!date) return "Belirtilmemiş";
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString("tr-TR", options);
  };
  const translateGender = (gender) => {
    switch (gender) {
      case "Male":
        return "Erkek";
      case "Female":
        return "Kadın";
      case "Other":
        return "Diğer";
      default:
        return "Belirtilmedi";
    }
  };
  const formattedInterests =
    Array.isArray(user.interests) && user.interests.length > 0
        ? user.interests.join(", ") // İlgi alanlarını virgülle ayırarak göster
        : "İlgi alanları belirtilmemiş";


  if (loading) return <p>Yükleniyor...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div id="profile-page" class="profile-page">
    <div class="profile-container">
        <img
            src={user.profilePicture || "https://via.placeholder.com/150"}
            alt="Profil"
            className="profile-picture"
        />
        <div className="profile-details">
            <h2>{user.username}</h2>
            <p className="email-display">{user.email}</p>
        </div>
    </div>

      {editMode ? (
        <form onSubmit={handleFormSubmit} className="profile-form">
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="firstName">Ad</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={user.firstName || ""}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="lastName">Soyad</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={user.lastName || ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="birthDate">Doğum Tarihi</label>
                <input
                    type="date"
                    id="birthDate"
                    name="birthDate"
                    value={user.birthDate || ""}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="gender">Cinsiyet</label>
                <select
                    id="gender"
                    name="gender"
                    value={user.gender || ""}
                    onChange={handleInputChange}
                >
                    <option value="">Seçin</option>
                    <option value="Male">Erkek</option>
                    <option value="Female">Kadın</option>
                    <option value="Other">Diğer</option>
                </select>
            </div>
        </div>
    
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="phoneNumber">Telefon</label>
                <input
                    type="text"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={user.phoneNumber || ""}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="interests">İlgi Alanları</label>
                <input
                    type="text"
                    id="interests"
                    name="interests"
                    value={Array.isArray(user.interests) ? user.interests.join(", ") : ""}
                    onChange={(e) =>
                        setUser({
                            ...user,
                            interests: e.target.value.split(",").map((i) => i.trim()),
                        })
                    }
                />
            </div>
        </div>
    
        <div className="form-row">
            <div className="form-group">
                <label htmlFor="profilePicture">Profil Resmi URL</label>
                <input
                    type="text"
                    id="profilePicture"
                    name="profilePicture"
                    value={user.profilePicture || ""}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    
        <button type="submit" className="update-button">Kaydet</button>
    </form>
    
      ) : (
        <div className="profile-info">
          <p><strong>Ad:</strong> {user.firstName || "Belirtilmemiş"}</p>
          <p><strong>Soyad:</strong> {user.lastName || "Belirtilmemiş"}</p>
          <p><strong>Doğum Tarihi:</strong> {formatDate(user.birthDate)}</p>
          <p><strong>Cinsiyet:</strong> {translateGender(user.gender)}</p>
          <p><strong>Telefon Numarası:</strong> {user.phoneNumber || "Belirtilmemiş"}</p>
          <p><strong>İlgi Alanları:</strong> {formattedInterests}</p>

          <button className="edit-button" onClick={() => setEditMode(true)}>Bilgileri Güncelle</button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
