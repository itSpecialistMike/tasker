import { useQuery } from "@tanstack/react-query";
import API from "@/lib/axios";
import { Task } from "@/types/task";

const fetchTasks = async (): Promise<Task[]> => {
  const response = await API.get("/list");
  if (response.status !== 200) {
    throw new Error("Ошибка загрузки задач");
  }
  return response.data;
};

export const useTasks = (enabled: boolean = true) => {
  const {
    data: tasks = [],
    isLoading: loading,
    isError,
    error,
    refetch,
  } = useQuery<Task[], Error>({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    enabled, // 👈 только если true — выполнится запрос

  });

  return {
    tasks,
    loading,
    error: isError ? error.message : null,
    refetch,
  };
};
