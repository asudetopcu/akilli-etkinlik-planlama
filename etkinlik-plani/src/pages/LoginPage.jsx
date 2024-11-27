import React from 'react';

const LoginPage = () => {
    return (
        <div>
            <h1>Giriş Yap</h1>
            <input type="text" placeholder="Kullanıcı Adı" />
            <input type="password" placeholder="Şifre" />
            <button>Giriş Yap</button>
        </div>
    );
};

export default LoginPage;
