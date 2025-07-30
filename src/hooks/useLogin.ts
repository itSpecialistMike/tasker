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
  // Состояние для хранения текста ошибки, если авторизация не удалась
  const [error, setError] = useState<string | null>(null);

  // Состояние индикатора загрузки во время запроса
  const [loading, setLoading] = useState(false);

  /**
   * loginUser:
   * - отправляет POST-запрос на /api/login с login и password
   * - если токен получен, сохраняет его в localStorage
   * - возвращает флаг success и данные (если есть)
   */
  const loginUser = async (data: LoginData) => {
    // Сброс ошибки и включение индикатора загрузки
    setError(null);
    setLoading(true);

    try {
      // Отправляем запрос на API авторизации
      const response = await API.post('/api/login', data);

      /**
       * Если сервер вернул 200 и токен:
       * - сохраняем токен в localStorage
       * - возвращаем успех и данные пользователя
       */
      if (response.status === 200 && response.data.token) {
        localStorage.setItem('jwtToken', response.data.token);
        return { success: true, data: response.data };
      } else {
        // В случае отсутствия токена или кода 200 — неудача
        return { success: false };
      }
    } catch (err: any) {
      /**
       * При ошибке:
       * - если есть сообщение от сервера, показываем его
       * - иначе выводим сообщение по умолчанию
       */
      setError(err.response?.data?.message || 'Ошибка авторизации');
      return { success: false };
    } finally {
      // Всегда отключаем индикатор загрузки в конце запроса
      setLoading(false);
    }
  };

  /**
   * Возвращаем:
   * - функцию loginUser
   * - текущее сообщение об ошибке
   * - флаг загрузки
   */
  return { loginUser, error, loading };
};
