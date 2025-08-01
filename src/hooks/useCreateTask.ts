// tasker/src/hooks/useCreateTask.ts
import { useState } from 'react';
import API from '@/lib/axios';

/**
 * Интерфейс для данных новой задачи, которые будут отправлены на сервер.
 */
interface TaskData {
    title: string;
    description: string;
    status: string;
    reporterId: string;
    deadline: string;
    dashboardId: string;
}

/**
 * Интерфейс для ответа сервера после успешного создания задачи.
 */
interface CreateTaskResponse {
    message: string;
    taskId: string;
}

/**
 * Кастомный React-хук useCreateTask:
 * - Управляет процессом создания новой задачи.
 * - Возвращает функцию createTask и состояния loading, error и success.
 */
export const useCreateTask = () => {
    // Состояние для индикации загрузки
    const [loading, setLoading] = useState(false);
    // Состояние для хранения сообщения об ошибке
    const [error, setError] = useState<string | null>(null);
    // Состояние для отслеживания успешного завершения операции
    const [success, setSuccess] = useState(false);

    /**
     * createTask:
     * - Отправляет POST-запрос на /api/create с данными задачи.
     * - Обрабатывает состояния загрузки, ошибок и успеха.
     */
    const createTask = async (taskData: TaskData) => {
        // Сброс состояний перед началом нового запроса
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Отправляем POST-запрос с помощью настроенного axios
            const response = await API.post<CreateTaskResponse>('/create', taskData);

            if (response.status === 200) {
                setSuccess(true);
                return response.data;
            } else {
                throw new Error('Не удалось создать задачу');
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Ошибка при создании задачи');
            setSuccess(false);
            return null;
        } finally {
            setLoading(false);
        }
    };

    return { createTask, loading, error, success };
};
