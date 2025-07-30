// tasker/src/hooks/useTasks.ts
// Этот файл содержит хук для работы с задачами в приложении Tasker

// Импортируем тип Task и хуки React для управления состоянием и эффектами
import { Task } from '@/types/task';
import { useState, useEffect } from 'react';

/**
 * Кастомный React-хук useTasks:
 * - загружает список задач с API
 * - управляет состояниями tasks, loading и error
 */
export const useTasks = () => {
  // Состояние для хранения массива задач, изначально пустой массив
  const [tasks, setTasks] = useState<Task[]>([]);
  // Индикатор загрузки — true пока идёт загрузка
  const [loading, setLoading] = useState<boolean>(true);
  // Ошибка загрузки — строка с сообщением или null, если ошибок нет
  const [error, setError] = useState<string | null>(null);

  // useEffect вызывается один раз при монтировании компонента
  useEffect(() => {
    // Асинхронная функция для загрузки задач с сервера
    const fetchTasks = async () => {
      try {
        // Отправляем GET-запрос на эндпоинт /tasklist
        // credentials: 'include' — для отправки куков вместе с запросом (если JWT в cookie)
        const res = await fetch('/tasklist', {
          credentials: 'include',
        });

        // Проверяем успешность ответа
        if (!res.ok) throw new Error('Ошибка загрузки задач');

        // Парсим JSON с сервера в массив задач типа Task[]
        const data: Task[] = await res.json();

        // Обновляем состояние tasks загруженными данными
        setTasks(data);
      } catch (err) {
        // Если произошла ошибка — записываем её сообщение в error
        setError((err as Error).message);
      } finally {
        // В любом случае выключаем индикатор загрузки
        setLoading(false);
      }
    };

    // Запускаем загрузку задач
    fetchTasks();
  }, []); // Пустой массив зависимостей — запускается только один раз

  // Возвращаем текущие данные, статус загрузки и ошибку из хука
  return { tasks, loading, error };
};
