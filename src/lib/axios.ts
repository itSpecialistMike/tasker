// tasker/src/lib/axios.ts
import axios from 'axios';

// Создаем экземпляр axios с базовым URL
const API = axios.create({
    baseURL: 'http://147.45.231.222:3000',
    // ✔️ Эта опция критически важна! Она позволяет axios отправлять
    // cookie, которые были установлены сервером, с каждым запросом.
    withCredentials: true,
});

/**
 * Интерцептор, который автоматически добавляет токен из cookie.
 * Эта часть кода не нужна, если токен передается через cookie, а не
 * через заголовок 'Authorization'. Axios сам отправит cookie.
 *
 * Если бы токен хранился в localStorage, интерцептор выглядел бы так:
 * API.interceptors.request.use((config) => {
 * const token = localStorage.getItem('jwtToken');
 * if (token) {
 * config.headers['Authorization'] = `Bearer ${token}`;
 * }
 * return config;
 * });
 */

export default API;
