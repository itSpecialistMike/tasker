// tasker/src/hooks/useUser.ts
import { useState, useEffect } from 'react';
import API from '@/lib/axios';

/**
 * Интерфейс для данных пользователя.
 */
interface User {
  id: number;
  name: string;
  surname: string;
  middlename: string;
  login: string;
  roleID: number;
}

/**
 * Интерфейс для результата хука useUser:
 * - user: объект пользователя или null
 * - loading: флаг загрузки
 * - error: сообщение об ошибке или null
 */
interface UseUserResult {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Кастомный React-хук useUser:
 * - Выполняет запрос к API для получения данных пользователя,
 * опираясь на аутентификационный cookie, установленный сервером.
 * - Возвращает объект пользователя, а также состояния loading и error.
 */
export function useUser(): UseUserResult {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setError(null);
      setLoading(true);

      try {
        // Запрос к API. Axios автоматически отправит cookie.
        const response = await API.get<User>('/api/getuserbyJWT');
        setUser(response.data);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Ошибка загрузки данных пользователя');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return { user, loading, error };
}
