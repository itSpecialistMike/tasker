// tasker/src/app/task/[id]/page.tsx
'use client';

import { useParams } from 'next/navigation';
import TaskDetails from '@/components/taskComponents/TaskDetails';
import TaskLayout from '@/components/taskComponents/TaskLayout';
import { mockTasks } from '@/mocks/tasks';

export default function TaskPage() {
  const params = useParams();
  const taskId = params?.id as string;

  // Найдем таску в моках (замени на реальный fetch / API)
  const task = mockTasks.find(t => t.id === taskId);
  const dashboardId = task?.dashboardId || '';

  return (
    <TaskLayout selectedDashboardId={dashboardId}>
      <TaskDetails taskId={taskId} />
    </TaskLayout>
  );
}
