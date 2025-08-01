// tasker/src/hooks/useTasks.ts
import { Task } from '@/types/task';
import { useState, useEffect } from 'react';
import { mockTasks } from '@/mocks/tasks';

/**
 * Кастомный React-хук useTasks:
 * - Загружает список задач с моковых данных или реального API,
 * основываясь на переменной окружения NEXT_PUBLIC_USE_MOCKS.
 * - Управляет состояниями tasks, loading и error.
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

  // useEffect запускается при монтировании компонента
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
          // Здесь также можно использовать переменную окружения для URL
          const res = await fetch('/list', {
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