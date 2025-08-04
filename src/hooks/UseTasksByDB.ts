import { useState, useEffect } from "react";
import API from "@/lib/axios";
import { Task } from "@/types/task";

export const useTasksByDB = (dashboardId: string) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!dashboardId) return;

        const fetchTasks = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await API.get(`/taskByDB/${dashboardId}`);
                setTasks(response.data);
            } catch (err: any) {
                setError(err.message || "Ошибка при загрузке задач");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [dashboardId]); // просто dashboardId

    return { tasks, loading, error };
};
