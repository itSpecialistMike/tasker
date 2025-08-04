import { useState, useEffect } from 'react';
import API from '@/lib/axios';

export interface User {
  id: string;
  login: string;
  name: string;
  // другие поля, если есть
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await API.get<User[]>('/Users');
        setUsers(response.data);
      } catch (err) {
        setError('Не удалось загрузить пользователей.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Пустой массив зависимостей означает, что эффект выполнится только один раз при монтировании компонента

  return { users, loading, error };
};