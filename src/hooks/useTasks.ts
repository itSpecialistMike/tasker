import { Task } from '@/types/task';
import { useState, useEffect } from 'react';
import API from '@/lib/axios'; // Импорт настроенного axios

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useTasks.ts
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      setTasks([]);

      try {
        const response = await API.get('/list');

        if (response.status !== 200) {
          throw new Error('Ошибка загрузки задач');
        }

        const data: Task[] = response.data;
        setTasks(data);
      } catch (err: any) {
        const errorMessage = err.response?.data?.error || err.message || 'Неизвестная ошибка';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []); // пустой массив — всегда одинаковый размер


  return { tasks, loading, error };
};
