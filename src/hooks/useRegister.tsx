// src/hooks/useRegister.ts
// Этот файл содержит хук для регистрации нового пользователя в приложении Tasker
import { useState } from 'react';
import API from '@/lib/axios'; // Настроенный экземпляр axios с baseURL
import axios from 'axios';

/**
 * Интерфейс ожидаемых данных при регистрации:
 * - name: имя пользователя
 * - surname: фамилия
 * - login: логин (уникальный идентификатор)
 * - roleID: ID роли (например, 1 = обычный пользователь)
 * - password: пароль
 */
interface RegisterData {
  name: string;
  surname: string;
  login: string;
  roleID: number;
  password: string;
}

/**
 * Хук useRegister:
 * - предоставляет функцию registerUser для отправки данных регистрации
 * - управляет состояниями error (ошибка) и loading (загрузка)
 */
export const useRegister = () => {
  // Состояние для отображения ошибок регистрации
  const [error, setError] = useState<string | null>(null);

  // Состояние для отображения индикатора загрузки
  const [loading, setLoading] = useState(false);

  /**
   * registerUser:
   * - асинхронная функция, отправляющая POST-запрос на /api/register
   * - устанавливает loading=true во время запроса
   * - при ошибке сохраняет сообщение ошибки в state
   * - возвращает данные пользователя при успехе или null при ошибке
   */
  const registerUser = async (data: RegisterData) => {
    setError(null); // Сбрасываем старую ошибку
    setLoading(true); // Включаем индикатор загрузки

    try {
      // Отправляем POST-запрос на сервер с регистрационными данными
      const response = await API.post('/api/register', data);

      // Возвращаем результат (например, id нового пользователя)
      return response.data;
    } catch (err: any) {
      /**
       * Если ошибка была от axios (например, 400/500 от сервера),
       * пытаемся достать сообщение об ошибке из ответа.
       */
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || 'Ошибка регистрации');
      } else {
        // Если ошибка не связана с axios (например, ошибка JS)
        setError('Неизвестная ошибка');
      }
      return null;
    } finally {
      // В любом случае отключаем индикатор загрузки
      setLoading(false);
    }
  };

  /**
   * Возвращаем наружу:
   * - функцию регистрации
   * - флаг загрузки
   * - сообщение об ошибке (если было)
   */
  return { registerUser, error, loading };
};
