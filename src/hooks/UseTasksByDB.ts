import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";
import { Task } from "@/types/task";

export const useTasksByDB = (dashboardId: string | null) => {
    return useQuery<Task[], Error>({
        queryKey: ["tasksByDB", dashboardId],
        queryFn: async () => {
            if (!dashboardId) return [];
            const response = await API.get(`/taskByDB/${dashboardId}`);
            return response.data;
        },
        enabled: Boolean(dashboardId), // запрос только если dashboardId есть
    });
};