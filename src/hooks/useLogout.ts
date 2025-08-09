// src/hooks/useLogout.js
import API from "@/lib/axios";

// Хук теперь возвращает функцию, которая выполняет запрос
export default function useLogout() {
    const logout = async () => {
        // Здесь мы можем добавить обработку ошибок или другие действия
        try {
            await API.post('/api/logout');
        } catch (error) {
            console.error("Ошибка при выходе из системы:", error);
            // Можно пробросить ошибку дальше, если это нужно
            throw error;
        }
    };

    // Хук возвращает эту асинхронную функцию
    return logout;
};