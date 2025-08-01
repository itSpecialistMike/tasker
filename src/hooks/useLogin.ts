// src/hooks/useLogin.ts
// Этот файл содержит хук для авторизации пользователя в приложении Tasker
import { useState } from 'react';
import API from '@/lib/axios'; // Преднастроенный axios-инстанс

/**
 * Интерфейс для входных данных авторизации:
 * - login: строка (логин пользователя)
 * - password: строка (пароль пользователя)
 */
interface LoginData {
  login: string;
  password: string;
}

/**
 * Хук useLogin:
 * - управляет процессом авторизации пользователя
 * - возвращает функцию loginUser и состояния ошибки/загрузки
 */
export const useLogin = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  /**
   * loginUser:
   * - отправляет POST-запрос на /api/login с login и password.
   * - После успешного ответа сервер установит cookie, поэтому здесь
   * нам не нужно ничего сохранять в localStorage.
   */
  const loginUser = async (data: LoginData) => {
    setError(null);
    setLoading(true);

    try {
      // Отправляем запрос на API авторизации.
      // Axios-интерцептор в API уже настроен на работу с cookie.
      const response = await API.post('/api/login', data);

      if (response.status === 200) {
        // Сервер успешно установил cookie.
        return { success: true, data: response.data };
      } else {
        return { success: false };
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Ошибка авторизации');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loginUser, error, loading };
};
