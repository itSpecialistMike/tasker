// src/hooks/useTasks.ts
import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";
import { Task } from "@/types/task";
import axios from "axios";

const fetchTasks = async (): Promise<Task[]> => {
  try {
    const response = await API.get("/list");
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response?.status === 401) {
      throw new Error("Не авторизован. Не удалось загрузить задачи.");
    }
    throw new Error("Ошибка загрузки задач");
  }
};

interface UseTasksOptions {
  enabled?: boolean;
}

export const useTasks = (options: UseTasksOptions = {}) => {
  const { enabled = true } = options;
  const {
    data: tasks = [],
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled,
    retry: (failureCount, error) => {
      return !(axios.isAxiosError(error) && error.response?.status === 401) && failureCount < 3;
    },
  });

  return {
    tasks,
    loading,
    error: isError ? error.message : null,
    refetch,
  };
};