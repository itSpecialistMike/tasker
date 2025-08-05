import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";
import type { Task } from "@/types/task";

export function useTask(taskId: string | null) {
    return useQuery<Task, Error>({
        queryKey: ["task", taskId],
        queryFn: async () => {
            if (!taskId) throw new Error("taskId is required");

            const response = await API.get(`/task/by_id/${taskId}`);
            console.log("API response:", response.data); // <-- Добавь сюда лог

            const taskData = response.data;

            if (taskData.blockedBy === null) {
                taskData.blockedBy = [];
            }

            return taskData;
        },

        enabled: Boolean(taskId),
        retry: false,
    });
}
