// tasker/src/app/task/[id]/page.tsx
'use client';

/**
 * Импортируем хуки и компоненты:
 * - useParams из next/navigation для получения ID из URL
 * - useEffect из react для управления состоянием
 * - TaskDetails и TaskLayout для отображения деталей задачи
 * - useTask — новый хук для загрузки отдельной задачи
 * - useDashboard — кастомный хук для работы с контекстом дашборда
 */
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import TaskDetails from '@/components/taskComponents/TaskDetails';
import TaskLayout from '@/components/taskComponents/TaskLayout';
import { useTask } from "@/hooks/useTask"; // ✔️ Импортируем новый хук
import { useDashboard } from "@/hooks/useDashboard";

/**
 * Компонент TaskPage:
 * - Основная страница для просмотра деталей отдельной задачи
 * - Получает ID задачи из URL
 * - Использует хук useTask для загрузки данных
 */
export default function TaskPage() {
  const params = useParams();
  const taskId = params?.id as string;

  // ✔️ Используем новый хук useTask для получения одной задачи по ID
  const { task, loading, error } = useTask(taskId);
  const { onDashboardChange, selectedDashboardId } = useDashboard();

  // ✔️ Используем useEffect для обновления контекста дашборда
  useEffect(() => {
    // Обновляем контекст, только если ID дашборда задачи
    // отличается от текущего, чтобы избежать лишних изменений URL.
    if (task?.dashboardId && task.dashboardId !== selectedDashboardId) {
      onDashboardChange(task.dashboardId);
    }
  }, [task, onDashboardChange, selectedDashboardId]);

  // Обработка состояний загрузки и ошибок
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-500">Ошибка загрузки задачи: {error}</p>;

  if (!task) {
    return <p className="text-gray-500">Задача с ID "{taskId}" не найдена.</p>;
  }

  return (
      <TaskLayout>
        <TaskDetails task={task} />
      </TaskLayout>
  );
}