const User = require("../models/User");

exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: [
                "id",
                "username",
                "email",
                "firstName",
                "lastName",
                "birthDate",
                "gender",
                "phoneNumber",
                "profilePicture",
                "interests",
            ],
        });

        if (!user) {
            return res.status(404).json({ message: "Kullanıcı bulunamadı." });
        }

        const interests = user.interests ? JSON.parse(user.interests) : [];
        res.status(200).json({ ...user.toJSON(), interests });
    } catch (error) {
        console.error("Profil alma hatası:", error);
        res.status(500).json({ message: "Bir hata oluştu." });
    }
};

exports.updateUserProfile = async (req, res) => {
    try {
        const userId = req.user.id; 
        const {
            firstName,
            lastName,
            birthDate,
            gender,
            phoneNumber,
            profilePicture,
            interests,
        } = req.body;

        console.log("Kullanıcı ID:", userId);
        console.log("Gelen Veriler:", req.body);
        console.log("Kullanıcı ID (req.user.id):", userId); 
        console.log("Gelen Veriler (req.body):", req.body); 

        const updatedUser = await User.update(
            {
                firstName,
                lastName,
                birthDate,
                gender,
                phoneNumber,
                profilePicture,
                interests: JSON.stringify(interests),
            },
            { where: { id: userId }, returning: true }
        );
        
        console.log("Güncelleme Sonucu:", updatedUser);

        if (updatedUser[0] === 0) { 
            console.log("Güncelleme başarısız: Kullanıcı bulunamadı veya veri değişmedi.");
            return res.status(404).json({ message: "Kullanıcı bulunamadı veya veri değişmedi." });
        }

        res.status(200).json({ message: "Profil başarıyla güncellendi." });
    } catch (error) {
        console.error("Güncelleme hatası:", error);
        res.status(500).json({ message: "Profil güncellenirken bir hata oluştu." });
    }
};

