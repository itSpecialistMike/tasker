// hooks/useCreateTask.ts
import { useState } from 'react';
import API from '@/lib/axios';

// Тип данных, которые будут отправлены на сервер
export interface CreateTaskPayload {
    title: string;
    description: string;
    deadline: string; // Добавлено поле deadline
    dashboardID: string;
    reporterID: string;
    approveStatus: 'approved' | 'need-approval';
    approverID: string;
    blockers: string[];
}

export const useCreateTask = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const createTask = async (payload: CreateTaskPayload, isMock = true) => {
        setLoading(true);
        setSuccess(false);
        setError(null);

        try {
            if (isMock) {
                // --- РЕЖИМ ИМИТАЦИИ (MOCK) ---
                console.log("Имитация отправки данных:", payload);
                await new Promise(resolve => setTimeout(resolve, 1500)); // Имитация задержки 1.5 секунды

                // Для проверки ошибки, раскомментируйте эту строку
                // throw new Error("Имитированная ошибка сервера");

                setSuccess(true);
                // -----------------------------
            } else {
                // --- РЕАЛЬНЫЙ РЕЖИМ ---
                const response = await API.post('/create', payload);

                if (response.status === 200 || response.status === 201) {
                    setSuccess(true);
                } else {
                    setError('Failed to create task with status: ' + response.status);
                }
            }
        } catch (err) {
            // Обработка ошибок в реальном или имитированном режиме
            const errorMessage = (err instanceof Error) ? err.message : 'An unexpected error occurred.';
            setError(errorMessage);
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return { createTask, loading, success, error };
};
