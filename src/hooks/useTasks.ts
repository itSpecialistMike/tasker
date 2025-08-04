import { useState, useEffect, useCallback } from "react";
import { Task } from "@/types/task";
import API from "@/lib/axios";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Оборачиваем fetchTasks в useCallback, чтобы избежать лишних перерендеров
  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    setTasks([]);

    try {
      const response = await API.get("/list");

      if (response.status !== 200) {
        throw new Error("Ошибка загрузки задач");
      }

      setTasks(response.data);
    } catch (err: any) {
      const errorMessage =
          err.response?.data?.error || err.message || "Неизвестная ошибка";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Загружаем при инициализации
  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return {
    tasks,
    loading,
    error,
    refetch: fetchTasks, // Можно использовать вручную или извне
  };
};
