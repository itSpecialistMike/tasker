import { useState, useEffect } from 'react';
import API from '@/lib/axios';

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await API.get('/tasklist'); // токен в заголовке автоматом
        setTasks(response.data);
      } catch {
        setError('Ошибка загрузки задач');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, error, loading };
};
