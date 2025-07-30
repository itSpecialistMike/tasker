// tasker/src/lib/axios.ts
// Этот файл содержит преднастроенный экземпляр axios для работы с API
// Импортируем axios — HTTP-клиент для отправки запросов
import axios from 'axios';

/**
 * Создаём экземпляр axios с базовой конфигурацией:
 * - baseURL: корневой URL для всех запросов, берётся из переменной окружения
 * - headers: устанавливаем Content-Type по умолчанию как application/json
 */
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Добавляем интерцептор запросов:
 * - перед каждым запросом получаем JWT из localStorage
 * - если токен есть, добавляем его в заголовок Authorization
 * - это позволяет автоматически авторизовывать все запросы
 */
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error) // В случае ошибки запроса — пробрасываем её дальше
);

// Экспортируем настроенный экземпляр axios для повторного использования
export default API;
