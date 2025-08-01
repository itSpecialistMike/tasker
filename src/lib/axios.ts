// tasker/src/lib/axios.ts
import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const API = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    // ✔️ Эта опция критически важна! Она позволяет axios отправлять
    // cookie, которые были установлены сервером, с каждым запросом.
    withCredentials: true,
});

export default API;
