// src/hooks/useUser.ts
// Этот файл содержит хук для получения информации о текущем пользователе в приложении Tasker

import { useState, useEffect } from 'react';

/**
 * Интерфейс User:
 * Описывает структуру объекта пользователя, возвращаемого с сервера.
 * Здесь можно добавить любые дополнительные поля, которые приходят из /api/userByJWT.
 */
interface User {
  id: string;
  name: string;
  login: string;
  // Добавь другие поля по необходимости, например: email, role, etc.
}

/**
 * Интерфейс возвращаемого значения из useUser:
 * - user: объект пользователя или null, если пользователь не авторизован
 * - loading: true во время загрузки, false после завершения запроса
 * - error: сообщение об ошибке, если она произошла
 */
interface UseUserReturn {
  user: User | null;
  loading: boolean;
  error: string | null;
}

/**
 * Хук useUser:
 * Выполняет запрос к API для получения информации о текущем авторизованном пользователе.
 * Ожидается, что сервер определяет пользователя на основе JWT, передаваемого через HttpOnly cookie.
 * Если пользователь авторизован, в стейт записывается объект user.
 * Если нет — error и user = null.
 */
export const useUser = (): UseUserReturn => {
  const [user, setUser] = useState<User | null>(null); // Текущее состояние пользователя
  const [loading, setLoading] = useState(true);        // Индикатор загрузки
  const [error, setError] = useState<string | null>(null); // Сообщение об ошибке

  /**
   * useEffect:
   * Выполняется один раз при монтировании компонента.
   * Выполняет GET-запрос к /api/userByJWT, чтобы получить данные о текущем пользователе.
   */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true); // Устанавливаем состояние загрузки

        const res = await fetch('/api/userme', {
          credentials: 'include', // Важно: позволяет отправлять cookie вместе с запросом
        });

        // Если ответ не ок, значит пользователь не авторизован или произошла ошибка
        if (!res.ok) {
          setUser(null);
          setError('Не авторизован');
          return;
        }

        const data: User = await res.json(); // Парсим тело ответа
        setUser(data);                       // Сохраняем пользователя в стейт
      } catch (e) {
        // Обработка ошибок сети или парсинга
        setError('Ошибка при загрузке пользователя');
        setUser(null);
      } finally {
        setLoading(false); // Завершаем загрузку в любом случае
      }
    };

    fetchUser();
  }, []);

  // Возвращаем объект с данными о пользователе, индикатором загрузки и ошибкой
  return { user, loading, error };
};
