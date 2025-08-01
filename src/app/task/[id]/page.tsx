// tasker/src/app/task/[id]/page.tsx
'use client';

/**
 * Импортируем хуки и компоненты:
 * - useParams из next/navigation для получения ID из URL
 * - useEffect, useState, useMemo из react для управления состоянием
 * - TaskDetails и TaskLayout для отображения деталей задачи
 * - useTasks — обновленный хук для загрузки задач
 * - useDashboard — кастомный хук для работы с контекстом дашборда
 */
import { useParams } from 'next/navigation';
import { useState, useEffect, useMemo } from 'react';
import TaskDetails from '@/components/taskComponents/TaskDetails';
import TaskLayout from '@/components/taskComponents/TaskLayout';
import { useTasks } from "@/hooks/useTasks";
import { useDashboard } from "@/hooks/useDashboard";

/**
 * Компонент TaskPage:
 * - Основная страница для просмотра деталей отдельной задачи
 * - Получает ID задачи из URL
 * - Использует хук useTasks для загрузки данных
 */
export default function TaskPage() {
  const params = useParams();
  const taskId = params?.id as string;
  const [useMockData] = useState(true);

  const { onDashboardChange, selectedDashboardId } = useDashboard();
  const { tasks, loading, error } = useTasks(useMockData);

  // ✔️ Используем useMemo для мемоизации объекта задачи.
  // Это предотвратит ненужные рендеры и разрывает цикл.
  const task = useMemo(() => tasks.find(t => t.id === taskId), [tasks, taskId]);

  // ✔️ Используем useEffect для обновления контекста при загрузке задачи
  useEffect(() => {
    // Обновляем контекст, только если ID дашборда задачи
    // отличается от текущего, чтобы избежать лишних изменений URL.
    if (task?.dashboardId && task.dashboardId !== selectedDashboardId) {
      onDashboardChange(task.dashboardId);
    }
  }, [task, onDashboardChange, selectedDashboardId]);

  // Обработка состояний загрузки и ошибок
  if (loading) return <p>Загрузка...</p>;
  if (error) return <p className="text-red-500">Ошибка загрузки задач: {error}</p>;

  if (!task) {
    return <p className="text-gray-500">Задача с ID "{taskId}" не найдена.</p>;
  }

  return (
      <TaskLayout>
        <TaskDetails task={task} />
      </TaskLayout>
  );
}
