export type TaskStatus =
  | 'to-do'
  | 'in-progress'
  | 'review'
  | 'blocked'
  | 'done'
  | 'canceled';

export type ApproveStatus =
  | 'need-approval'
  | 'approval'
  | 'approved'
  | 'rejected';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  reporterId: string;
  assignerId: string | null;
  reviewerId: string | null;
  approverId: string;
  approveStatus: ApproveStatus;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  deadline: string;
  dashboardId: string;
  blockedBy: string[];
}

export const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Добавить авторизацию',
    description: 'Регистрация, логин, защита роутов',
    status: 'in-progress',
    reporterId: 'user-1',
    assignerId: 'user-2',
    reviewerId: 'user-3',
    approverId: 'user-1',
    approveStatus: 'approved',
    createdAt: '2025-07-20T09:00:00Z',
    startedAt: '2025-07-21T10:00:00Z',
    completedAt: null,
    deadline: '2025-07-30',
    dashboardId: 'dash-1',
    blockedBy: [],
  },
  {
    id: '2',
    title: 'Создать UI главного дашборда',
    description: 'Компоненты, таблицы, графики',
    status: 'to-do',
    reporterId: 'user-2',
    assignerId: null,
    reviewerId: null,
    approverId: 'user-2',
    approveStatus: 'need-approval',
    createdAt: '2025-07-19T14:00:00Z',
    startedAt: null,
    completedAt: null,
    deadline: '2025-08-01',
    dashboardId: 'dash-1',
    blockedBy: ['1'],
  },
  {
    id: '3',
    title: 'Настроить CI/CD',
    description: 'GitHub Actions + Vercel',
    status: 'done',
    reporterId: 'user-1',
    assignerId: 'user-3',
    reviewerId: 'user-1',
    approverId: 'user-4',
    approveStatus: 'approved',
    createdAt: '2025-07-15T08:00:00Z',
    startedAt: '2025-07-16T09:30:00Z',
    completedAt: '2025-07-20T17:00:00Z',
    deadline: '2025-07-25',
    dashboardId: 'dash-2',
    blockedBy: [],
  },
  {
    id: '4',
    title: 'Рефакторинг компонентов',
    description: 'Разделение логики и UI',
    status: 'blocked',
    reporterId: 'user-2',
    assignerId: 'user-4',
    reviewerId: null,
    approverId: 'user-3',
    approveStatus: 'need-approval',
    createdAt: '2025-07-21T10:00:00Z',
    startedAt: null,
    completedAt: null,
    deadline: '2025-07-29',
    dashboardId: 'dash-2',
    blockedBy: ['1', '3'],
  },
  {
    id: '5',
    title: 'Интеграция с беком',
    description: 'REST API, fetch, hook-логика',
    status: 'review',
    reporterId: 'user-3',
    assignerId: 'user-2',
    reviewerId: 'user-4',
    approverId: 'user-3',
    approveStatus: 'approval',
    createdAt: '2025-07-22T12:00:00Z',
    startedAt: '2025-07-23T13:00:00Z',
    completedAt: null,
    deadline: '2025-08-02',
    dashboardId: 'dash-1',
    blockedBy: [],
  },
  {
    id: '6',
    title: 'Создать страницу профиля',
    description: 'Имя, логин, роль, смена пароля',
    status: 'canceled',
    reporterId: 'user-1',
    assignerId: null,
    reviewerId: null,
    approverId: 'user-1',
    approveStatus: 'rejected',
    createdAt: '2025-07-15T10:00:00Z',
    startedAt: null,
    completedAt: '2025-07-18T18:00:00Z',
    deadline: '2025-08-05',
    dashboardId: 'dash-5',
    blockedBy: [],
  },
];
