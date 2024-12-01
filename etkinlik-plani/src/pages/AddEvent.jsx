import React, { useState } from 'react';

const AddEvent = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        location: '',
        category: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch('/api/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        }).then(res => res.json())
            .then(data => alert(data.message));
    };

    return (
        <div>
            <h2>Etkinlik Ekle</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Başlık" onChange={handleChange} required />
                <textarea name="description" placeholder="Açıklama" onChange={handleChange} required />
                <input type="date" name="date" onChange={handleChange} required />
                <input type="time" name="time" onChange={handleChange} required />
                <input type="text" name="location" placeholder="Yer" onChange={handleChange} required />
                <input type="text" name="category" placeholder="Kategori" onChange={handleChange} required />
                <button type="submit">Ekle</button>
            </form>
        </div>
    );
};

export default AddEvent;
