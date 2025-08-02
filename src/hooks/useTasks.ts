// tasker/src/hooks/useTasks.ts
import { Task } from '@/types/task';
import { useState, useEffect } from 'react';
import { mockTasks } from '@/mocks/tasks';
import API from '@/lib/axios'; // Импортируем настроенный экземпляр axios

/**
 * Кастомный React-хук useTasks:
 * - Загружает список задач с моковых данных или реального API.
 * - Управляет состояниями tasks, loading и error.
 * - Примечание: Токен аутентификации в виде cookie автоматически
 * добавляется настроенным экземпляром axios.
 */
export const useTasks = () => {
  // Состояние для хранения массива задач, изначально пустой массив
  const [tasks, setTasks] = useState<Task[]>([]);
  // Индикатор загрузки — true пока идёт загрузка
  const [loading, setLoading] = useState<boolean>(true);
  // Ошибка загрузки — строка с сообщением или null, если ошибок нет
  const [error, setError] = useState<string | null>(null);

  // Определяем, использовать ли моковые данные, из переменной окружения
  const useMockData = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

  useEffect(() => {
    const fetchTasks = async () => {
      // Сбрасываем состояния при каждом новом запросе
      setLoading(true);
      setError(null);
      setTasks([]);

      try {
        if (useMockData) {
          // Имитация асинхронной задержки с использованием Promise
          await new Promise(resolve => setTimeout(resolve, 500));
          setTasks(mockTasks);
        } else {
          // Запрос к реальному API с использованием axios
          // Токен добавляется в виде cookie благодаря настройке в axios.ts
          const response = await API.get('/list');

          if (response.status !== 200) {
            throw new Error('Ошибка загрузки задач');
          }

          const data: Task[] = response.data;
          setTasks(data);
        }
      } catch (err: any) {
        // Улучшенная обработка ошибок для axios
        const errorMessage = err.response?.data?.error || err.message || 'Неизвестная ошибка';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [useMockData]); // Зависимость от useMockData позволяет переключать источник данных

  // Возвращаем текущие данные, статус загрузки и ошибку из хука
  return { tasks, loading, error };
};