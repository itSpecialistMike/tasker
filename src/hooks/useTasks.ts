// src/hooks/useTasks.ts
import { useEffect, useState } from "react";
import axios from "axios";
import type { Task } from "@/types/task";

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const res = await axios.get<Task[]>(`${process.env.NEXT_PUBLIC_API_URL}/tasklist`);
        setTasks(res.data);
      } catch (err) {
        console.error("Ошибка при загрузке задач", err);
        setError("Не удалось загрузить задачи");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  return { tasks, loading, error };
};
