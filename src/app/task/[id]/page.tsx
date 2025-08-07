// tasker/src/app/task/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import TaskDetails from '@/components/taskComponents/TaskDetails';
import TaskLayout from '@/components/taskComponents/TaskLayout';
import { useTask } from "@/hooks/useTask";

// Убрали useDashboard и useEffect, так как логика перенесена
// import { useDashboard } from "@/hooks/useDashboard";

export default function TaskPage() {
  const params = useParams();
  const taskId = params?.id as string;

  const { data: task, isLoading: loading, error } = useTask(taskId);
  // Убрали useDashboard, потому что на этой странице он больше не нужен
  // const { onDashboardChange, selectedDashboardId } = useDashboard();

  // Убрали useEffect, потому что логика перенесена в DashboardLayout

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-500">Ошибка загрузки задачи: {error.message}</p>;

  if (!task) {
    return <p className="text-gray-500">Задача с ID {taskId} не найдена.</p>;
  }

  return (
      <TaskLayout>
        <TaskDetails task={task} />
      </TaskLayout>
  );
}