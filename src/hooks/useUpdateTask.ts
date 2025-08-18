// src/hooks/useUpdateTask.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "@/lib/axios";
import { TaskFormData } from "@/types/TaskFormData";

export interface UpdateTaskPayload {
    taskId: string;
    updates: {
        title?: string;
        description?: string;
        deadline?: string;
        reporterId?: string;
        approverId?: string;
        approveStatus?: 'approved' | 'need-approval' | 'approval' | 'rejected';
        dashboardId?: string;
        blockedBy?: string[] | null;
        status?: string;
        assignerId?: string | null;
    };
}

const updateTaskAPI = async (payload: UpdateTaskPayload): Promise<any> => {
    const { taskId, updates } = payload;
    const url = `/update/${taskId}`;

    // Добавляем console.log для отладки
    console.log("Отправка запроса на обновление задачи:", { url, updates });

    const response = await API.put(url, updates);
    if (response.status !== 200) {
        throw new Error("Failed to update task with status: " + response.status);
    }
    return response.data;
};

export const useUpdateTask = (queryKey: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<any, Error, UpdateTaskPayload>({
        mutationFn: updateTaskAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [queryKey] });
        },
        onError: (error) => {
            console.error("Ошибка при обновлении задачи:", error);
        },
    });

    return {
        updateTask: mutation.mutateAsync,
        loading: mutation.status === "pending",
        success: mutation.status === "success",
        error: mutation.error ? mutation.error.message : null,
    };
};