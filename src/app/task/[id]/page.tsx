// tasker/src/app/task/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import TaskDetails from '@/components/taskComponents/TaskDetails';
import TaskLayout from '@/components/taskComponents/TaskLayout';
import { useTasks } from "@/hooks/useTasks";

export default function TaskPage() {
  const params = useParams();
  const taskId = params?.id as string;

  // Вызов хука useTasks внутри компонента
  const { tasks, loading, error } = useTasks();

  // Пока данные грузятся, можно отобразить лоадер или ничего не показывать
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-500">Ошибка загрузки задач: {error}</p>;

  // Найдем задачу с нужным id
  const task = tasks.find(t => t.id === taskId);
  const dashboardId = task?.dashboardId || '';

  return (
    <TaskLayout selectedDashboardId={dashboardId}>
      <TaskDetails taskId={taskId} />
    </TaskLayout>
  );
}
