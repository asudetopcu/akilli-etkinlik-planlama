import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api", // Backend'inizin temel URL'si
    headers: {
        "Content-Type": "application/json",
    },
});

export default api;
