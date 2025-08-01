// tasker/src/hooks/useTask.ts
import { useState, useEffect } from 'react';
import API from '@/lib/axios';
import { mockTasks } from '@/mocks/tasks';
import { Task } from '@/types/task';

/**
 * Интерфейс для результата хука useTask:
 * - task: объект задачи или null
 * - loading: флаг загрузки
 * - error: сообщение об ошибке или null
 */
interface UseTaskResult {
    task: Task | null;
    loading: boolean;
    error: string | null;
}

/**
 * Хук useTask:
 * - Управляет процессом получения данных о задаче по её ID.
 * - Использует моковые данные или реальный API в зависимости от переменной окружения NEXT_PUBLIC_USE_MOCKS.
 * - Возвращает объект задачи, а также состояния loading и error.
 * @param taskId - ID задачи, которую необходимо получить.
 */
export function useTask(taskId: string | null): UseTaskResult {
    const [task, setTask] = useState<Task | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Определяем, использовать ли моковые данные, из переменной окружения
    const useMockData = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

    useEffect(() => {
        if (!taskId) {
            setLoading(false);
            return;
        }

        const fetchTask = async () => {
            setError(null);
            setLoading(true);

            if (useMockData) {
                // Логика для моковых данных
                const delay = 500; // Имитация сетевой задержки
                setTimeout(() => {
                    try {
                        // Ищем задачу по ID в моковых данных
                        const mockTask = mockTasks.find(t => t.id === taskId);
                        if (mockTask) {
                            setTask(mockTask);
                        } else {
                            setError(`Моковая задача с ID "${taskId}" не найдена.`);
                        }
                    } catch (err: any) {
                        setError("Ошибка при обработке моковых данных");
                    } finally {
                        setLoading(false);
                    }
                }, delay);
            } else {
                // Логика для реального API-запроса с использованием axios
                try {
                    // axios-интерцептор в src/lib/axios.ts автоматически добавит токен
                    const response = await API.get(`/task/by_id/${taskId}`);
                    setTask(response.data);
                } catch (err: any) {
                    setError(err.response?.data?.message || 'Ошибка загрузки задачи');
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchTask();
    }, [taskId, useMockData]);

    return { task, loading, error };
}
