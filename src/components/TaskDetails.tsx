// tasker/src/components/TaskDetails.tsx
'use client';

import { useMemo } from 'react';
import {
  mockTasks,
  type Task,
  type TaskStatus,
  type ApproveStatus,
} from '@/mocks/tasks';

type Props = {
  taskId: string;
};

const statusLabels: Record<TaskStatus, string> = {
  'to-do': 'К выполнению',
  'in-progress': 'В процессе',
  review: 'На проверке',
  blocked: 'Заблокирована',
  done: 'Завершена',
  canceled: 'Отменена',
};

const approveLabels: Record<ApproveStatus, string> = {
  'need-approval': 'Требует одобрения',
  approval: 'Ожидает одобрения',
  approved: 'Одобрена',
  rejected: 'Отклонена',
};

const formatDate = (dateString: string | null | undefined): string =>
  dateString
    ? new Date(dateString).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      })
    : '—';

export default function TaskDetails({ taskId }: Props) {
  const task: Task | undefined = useMemo(
    () => mockTasks.find((t) => t.id === taskId),
    [taskId]
  );

  if (!task) {
    return <p className="text-red-500 font-semibold">Задача не найдена.</p>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{task.title}</h1>
      <p className="text-gray-700 text-base">{task.description}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
        <div>
          <span className="font-medium">Статус:</span> {statusLabels[task.status]}
        </div>
        <div>
          <span className="font-medium">Согласование:</span> {approveLabels[task.approveStatus]}
        </div>
        <div>
          <span className="font-medium">Создана:</span> {formatDate(task.createdAt)}
        </div>
        <div>
          <span className="font-medium">Дедлайн:</span> {formatDate(task.deadline)}
        </div>
        {task.startedAt && (
          <div>
            <span className="font-medium">Начата:</span> {formatDate(task.startedAt)}
          </div>
        )}
        {task.completedAt && (
          <div>
            <span className="font-medium">Завершена:</span> {formatDate(task.completedAt)}
          </div>
        )}
      </div>

      {task.blockedBy.length > 0 && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
          Задача заблокирована задачами: <strong>{task.blockedBy.join(', ')}</strong>
        </div>
      )}
    </div>
  );
}
