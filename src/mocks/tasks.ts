// tasker/src/mocks/tasks.tsx
// Этот файл содержит моковые данные для списка задач,
// привязанных к новым дашбордам

import { Task } from '@/types/task';

/**
 * Моковый список задач
 * Используется для разработки, пока нет реального API
 * dashboardId теперь соответствует новым ID: 'dash-1', 'dash-2', 'dash-3' и т.д.
 */
export const mockTasks: Task[] = [
    {
        id: 'task-1',
        title: 'Настроить компонент Header',
        description: 'Обеспечить корректное отображение на всех разрешениях, а также переключение мобильного меню.',
        status: 'to-do',
        deadline: '2024-08-15T12:00:00Z',
        createdAt: '2024-08-01T09:00:00Z',
        reporterId: 'user-a',
        approverId: 'user-b',
        approveStatus: 'need-approval',
        dashboardId: 'dash-1', // ✔️ Обновленный ID дашборда
        blockedBy: [],
    },
    {
        id: 'task-2',
        title: 'Реализовать контекст для дашборда',
        description: 'Создать DashboardContext для управления состоянием выбранного дашборда.',
        status: 'done',
        deadline: '2024-07-30T17:00:00Z',
        createdAt: '2024-07-25T10:00:00Z',
        completedAt: '2024-07-29T16:30:00Z',
        assignerId: 'user-c',
        reporterId: 'user-c',
        approverId: 'user-c',
        approveStatus: 'approved',
        dashboardId: 'dash-2', // ✔️ Обновленный ID дашборда
        blockedBy: [],
    },
    {
        id: 'task-3',
        title: 'Стилизовать страницу "Not Found"',
        description: 'Придать странице 404 более привлекательный вид с помощью Tailwind CSS.',
        status: 'in-progress',
        deadline: '2024-08-10T23:59:00Z',
        createdAt: '2024-08-01T10:30:00Z',
        startedAt: '2024-08-01T11:00:00Z',
        assignerId: 'user-a',
        reporterId: 'user-a',
        approverId: 'user-b',
        approveStatus: 'approval',
        dashboardId: 'dash-2', // ✔️ Обновленный ID дашборда
        blockedBy: ['task-1'],
    },
    {
        id: 'task-4',
        title: 'Написать документацию',
        description: 'Создать документацию для новых компонентов и хуков.',
        status: 'blocked',
        deadline: '2024-08-20T12:00:00Z',
        createdAt: '2024-08-02T14:00:00Z',
        assignerId: 'user-d',
        reporterId: 'user-d',
        approverId: 'user-a',
        approveStatus: 'need-approval',
        dashboardId: 'dash-3', // ✔️ Обновленный ID дашборда
        blockedBy: ['task-3'],
    },
    {
        id: 'task-5',
        title: 'Подготовить презентацию для клиента',
        description: 'Собрать все данные и визуализировать их для встречи с клиентом.',
        status: 'in-progress',
        deadline: '2024-08-25T12:00:00Z',
        createdAt: '2024-08-03T10:00:00Z',
        startedAt: '2024-08-04T12:00:00Z',
        assignerId: 'user-a',
        reporterId: 'user-e',
        reviewerId: 'user-a',
        approverId: 'user-a',
        approveStatus: 'approval',
        dashboardId: 'dash-4', // ✔️ Обновленный ID дашборда
        blockedBy: [],
    },
    {
        id: 'task-6',
        title: 'Запланировать еженедельный спринт',
        description: 'Определить задачи на следующую неделю и распределить их по команде.',
        status: 'review',
        deadline: '2024-08-07T12:00:00Z',
        createdAt: '2024-08-05T10:00:00Z',
        assignerId: 'user-c',
        reporterId: 'user-c',
        reviewerId: 'user-a',
        approverId: 'user-c',
        approveStatus: 'need-approval',
        dashboardId: 'dash-5', // ✔️ Обновленный ID дашборда
        blockedBy: [],
    },
    {
        id: 'task-7',
        title: 'Составить список покупок',
        description: 'Список продуктов на неделю для домашнего хозяйства.',
        status: 'to-do',
        deadline: '2024-08-06T19:00:00Z',
        createdAt: '2024-08-05T15:00:00Z',
        assignerId: 'user-a',
        reporterId: 'user-a',
        approverId: 'user-a',
        approveStatus: 'approved',
        dashboardId: 'dash-5', // ✔️ Обновленный ID дашборда
        blockedBy: [],
    },
    {
        id: 'task-8',
        title: 'Отменить задачу',
        description: 'Пример отмененной задачи.',
        status: 'canceled',
        deadline: '2024-08-05T12:00:00Z',
        createdAt: '2024-08-04T10:00:00Z',
        assignerId: 'user-c',
        reporterId: 'user-c',
        approverId: 'user-c',
        approveStatus: 'rejected',
        dashboardId: 'dash-1', // ✔️ Обновленный ID дашборда
        blockedBy: [],
    },
];
