// tasker/src/hooks/useTasks.ts
// Этот файл содержит хук для работы с задачами в приложении Tasker

// Импортируем тип Task и хуки React для управления состоянием и эффектами
import { Task } from '@/types/task';
import { useState, useEffect } from 'react';
import { mockTasks } from '@/mocks/tasks';

/**
 * Кастомный React-хук useTasks:
 * - Загружает список задач с моковых данных или реального API
 * - Управляет состояниями tasks, loading и error
 * @param useMockData - Если true, использует моковые данные; иначе делает fetch-запрос.
 */
export const useTasks = (useMockData: boolean) => {
  // Состояние для хранения массива задач, изначально пустой массив
  const [tasks, setTasks] = useState<Task[]>([]);
  // Индикатор загрузки — true пока идёт загрузка
  const [loading, setLoading] = useState<boolean>(true);
  // Ошибка загрузки — строка с сообщением или null, если ошибок нет
  const [error, setError] = useState<string | null>(null);

  // useEffect запускается при монтировании компонента и при изменении useMockData
  useEffect(() => {
    const fetchTasks = async () => {
      // Сбрасываем состояния при каждом новом запросе
      setLoading(true);
      setError(null);
      setTasks([]);

      if (useMockData) {
        // Имитация задержки для моковых данных
        const delay = 500;
        setTimeout(() => {
          try {
            setTasks(mockTasks);
          } catch (err) {
            setError("Ошибка при обработке моковых данных");
          } finally {
            setLoading(false);
          }
        }, delay);
      } else {
        // Запрос к реальному API
        try {
          const res = await fetch('/tasklist', {
            credentials: 'include',
          });

          if (!res.ok) throw new Error('Ошибка загрузки задач');

          const data: Task[] = await res.json();
          setTasks(data);
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchTasks();
  }, [useMockData]); // Зависимость от useMockData позволяет переключать источник данных

  // Возвращаем текущие данные, статус загрузки и ошибку из хука
  return { tasks, loading, error };
};
