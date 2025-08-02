import React, { useState } from 'react';
// Импортируем типы для полей формы
import { TaskStatus, ApproveStatus } from '@/types/task';

// Тип пропсов, которые принимает компонент
interface Props {
    // При отправке формы вызывается функция с объектом данных, исключая поля id, createdAt и completedAt
    onSubmit: (data: Omit<TaskFormData, 'id' | 'createdAt' | 'completedAt'>) => void;
}

// Основной интерфейс формы
export interface TaskFormData {
    title: string;
    description: string;
    status: TaskStatus;
    deadline: string;
    assignerId?: string;
    reporterId: string;
    reviewerId?: string;
    approverId: string;
    approveStatus: ApproveStatus;
    dashboardId: string;
    blockedBy: string[]; // список ID задач, которые блокируют текущую
}

const TaskForm: React.FC<Props> = ({ onSubmit }) => {
    // Локальное состояние всей формы
    const [form, setForm] = useState<TaskFormData>({
        title: '',
        description: '',
        status: 'to-do',            // значение по умолчанию
        deadline: '',
        assignerId: '',
        reporterId: '',
        reviewerId: '',
        approverId: '',
        approveStatus: 'need-approval',
        dashboardId: '',
        blockedBy: [],
    });

    // Обработчик изменения обычных полей формы (input, textarea, select)
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;

        // Обновляем поле формы по имени
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Обработчик поля blockedBy (ожидаем список ID через запятую)
    const handleBlockedByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const ids = e.target.value.split(',').map((s) => s.trim()); // преобразуем строку в массив
        setForm((prev) => ({ ...prev, blockedBy: ids }));
    };

    // Обработка отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // предотвращаем перезагрузку страницы
        // Здесь можно добавить валидацию перед отправкой
        onSubmit(form); // передаём данные родителю
    };

    return (
        <form onSubmit={handleSubmit} className="p-7 max-w-md flex flex-col gap-4 rounded-2xl">
            {/* Название задачи */}
            <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Название"
                required
                className="input"
            />

            {/* Описание задачи */}
            <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Описание"
                className="input"
            />

            {/* Дедлайн */}
            <p>Дедлайн</p>
            <input
                name="deadline"
                type="datetime-local"
                value={form.deadline}
                onChange={handleChange}
                required
                className="input"
            />

            {/* ID дашборда */}
            <input
                name="dashboardId"
                value={form.dashboardId}
                onChange={handleChange}
                placeholder="Dashboard ID"
                required
                className="input"
            />

            {/* ID ответственного за утверждение */}
            <input
                name="approverId"
                value={form.approverId}
                onChange={handleChange}
                placeholder="Approver ID"
                required
                className="input"
            />

            {/* ID назначившего задачу (необязательное поле) */}
            <input
                name="assignerId"
                value={form.assignerId}
                onChange={handleChange}
                placeholder="Assigner ID (необязательно)"
                className="input"
            />

            {/* ID проверяющего (необязательное поле) */}
            <input
                name="reviewerId"
                value={form.reviewerId}
                onChange={handleChange}
                placeholder="Reviewer ID (необязательно)"
                className="input"
            />

            {/* Список ID задач, которые блокируют текущую (через запятую) */}
            <input
                name="blockedBy"
                onChange={handleBlockedByChange}
                placeholder="Заблокирована задачами (через запятую)"
                className="input"
            />

            {/* Статус задачи */}
            <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="input"
            >
                <option value="to-do">To Do</option>
                <option value="in-progress">In Progress</option>
                <option value="review">Review</option>
                <option value="blocked">Blocked</option>
                <option value="done">Done</option>
                <option value="canceled">Canceled</option>
            </select>

            {/* Статус утверждения */}
            <select
                name="approveStatus"
                value={form.approveStatus}
                onChange={handleChange}
                className="input"
            >
                <option value="need-approval">Need Approval</option>
                <option value="approval">Approval</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>

            {/* Кнопка отправки */}
            <button type="submit" className="btn btn-primary">
                Создать задачу
            </button>
        </form>
    );
};

export default TaskForm;
