import axios from 'axios';

const api = axios.create({
    // baseURL: `http://localhost:${import.meta.env.VITE_PORT}`
    baseURL: 'https://todoapp-1-18ru.onrender.com'
});

export default api;
