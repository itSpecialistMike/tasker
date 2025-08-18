// src/components/TaskEditForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useFetchDashboards } from "@/hooks/useFetchDashboards";
import { useUsers } from "@/hooks/useUsers";
import { useUpdateTask, UpdateTaskPayload } from "@/hooks/useUpdateTask";
import { Task, TaskStatus, ApproveStatus } from "@/types/task";
import { TaskFormData } from "@/types/TaskFormData";

interface Props {
    task: Task;
    onCancel: () => void;
    onSuccess: () => void;
}

const statusLabels: Record<TaskStatus, string> = {
    "to-do": "К выполнению",
    "in-progress": "В процессе",
    review: "На проверке",
    blocked: "Заблокирована",
    done: "Завершена",
    canceled: "Отменена",
};


const TaskEditForm: React.FC<Props> = ({ task, onCancel, onSuccess }) => {
    const { tasks } = useTasks();
    const { data: dashboards = [] } = useFetchDashboards();
    const { users } = useUsers();

    const { updateTask, loading, success, error } = useUpdateTask("tasks");

    const [form, setForm] = useState<TaskFormData>(() => ({
        title: task.title || "",
        description: task.description || "",
        deadline: task.deadline ? new Date(task.deadline).toISOString().substring(0, 16) : "",
        reporterId: task.reporterId || "",
        approverId: task.approverId || "",
        approveStatus: task.approveStatus || "approved",
        dashboardId: task.dashboardId || "",
        blockedBy: task.blockedBy || [],
    }));

    const [hasBlockers, setHasBlockers] = useState(task.blockedBy?.length > 0);
    const [currentStatus, setCurrentStatus] = useState<TaskStatus>(task.status);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlockedByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
        setForm((prev) => ({ ...prev, blockedBy: selected }));
    };

    const handleBlockersToggle = (isYes: boolean) => {
        setHasBlockers(isYes);
        if (!isYes) {
            setForm((prev) => ({ ...prev, blockedBy: [] }));
        }
    };

    const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrentStatus(e.target.value as TaskStatus);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Собираем объект с изменениями для отправки
        const updates: UpdateTaskPayload['updates'] = {
            title: form.title,
            description: form.description,
            deadline: form.deadline,
            reporterId: form.reporterId,
            approverId: form.approverId,
            approveStatus: form.approveStatus,
            dashboardId: form.dashboardId,
            blockedBy: hasBlockers ? form.blockedBy : null, // Устанавливаем null, если нет блокеров
            status: currentStatus,
            assignerId: form.reporterId // Пример: если assignerId и reporterId это одно и то же
        };

        // Устанавливаем approverId в null, если согласование не требуется
        if (form.approveStatus !== 'need-approval') {
            updates.approverId = null;
        }


        try {
            await updateTask({ taskId: task.id, updates });
            onSuccess();
        } catch (err) {
            console.error("Ошибка при обновлении задачи:", err);
            // Ошибка уже обрабатывается в хуке useUpdateTask, здесь можно добавить дополнительную логику UI
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 w-full flex flex-col gap-6 bg-white">
            <h2 className="text-3xl font-bold">Редактирование задачи: {task.title}</h2>

            {/* Заголовок */}
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-2xl text-gray-700 font-bold">Название задачи</label>
                <input
                    id="title"
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    placeholder="Например: Сделать прототип главной страницы"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Описание */}
            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-xl text-gray-700 font-bold">Описание</label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Детальное описание задачи..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[100px]"
                />
            </div>

            <section>
                <div className="flex gap-4 w-full">
                    {/* Дедлайн */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="deadline" className="text-xl text-gray-700 font-bold">Дедлайн</label>
                        <input
                            id="deadline"
                            name="deadline"
                            type="datetime-local"
                            value={form.deadline}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                        />
                    </div>
                    {/* Дашборд */}
                    <div className="flex flex-col gap-2 w-full">
                        <label htmlFor="dashboardId" className="text-xl text-gray-700 font-bold">Дашборд</label>
                        <select
                            id="dashboardId"
                            name="dashboardId"
                            value={form.dashboardId}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                        >
                            <option value="" disabled>Выберите дашборд</option>
                            {dashboards
                                .filter((db) => db.id !== 'all')
                                .map((db) => (
                                    <option key={db.id} value={db.id}>{db.name}</option>
                                ))}
                        </select>
                    </div>
                </div>
            </section>

            {/* Статус задачи */}
            <div className="flex flex-col gap-2">
                <label htmlFor="status" className="text-xl text-gray-700 font-bold">Статус</label>
                <select
                    id="status"
                    name="status"
                    value={currentStatus}
                    onChange={handleStatusChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 h-12"
                >
                    {Object.entries(statusLabels).map(([key, value]) => (
                        <option key={key} value={key}>{value}</option>
                    ))}
                </select>
            </div>

            <section className="flex gap-4 justify-between">
                {/* Секция для "Требуется согласование?" */}
                <div className="flex flex-col gap-2">
                    <label className="text-medium text-gray-700 font-medium">Требуется согласование?</label>
                    <div className="flex gap-4">
                        {/* Радио-кнопка "Да" */}
                        <div className="flex items-center gap-2">
                            <input
                                id="require-yes"
                                name="requireApproval"
                                type="radio"
                                checked={form.approveStatus === "need-approval"}
                                onChange={() => setForm(prev => ({ ...prev, approveStatus: "need-approval" }))}
                                className="h-6 w-6 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                            />
                            <label htmlFor="require-yes" className="text-medium text-gray-700 font-medium cursor-pointer">Да</label>
                        </div>
                        {/* Радио-кнопка "Нет" */}
                        <div className="flex items-center gap-2">
                            <input
                                id="require-no"
                                name="requireApproval"
                                type="radio"
                                checked={form.approveStatus === "approved"}
                                onChange={() => setForm(prev => ({ ...prev, approveStatus: "approved" }))}
                                className="h-6 w-6 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                            />
                            <label htmlFor="require-no" className="text-medium text-gray-700 font-medium cursor-pointer">Нет</label>
                        </div>
                    </div>
                </div>

                {/* Секция для "Есть блокирующие задачи?" */}
                <div className="flex flex-col gap-2">
                    <label className="text-medium text-gray-700 font-medium">Есть блокирующие задачи?</label>
                    <div className="flex gap-4">
                        {/* Радио-кнопка "Да" */}
                        <div className="flex items-center gap-2">
                            <input
                                id="blockers-yes"
                                name="hasBlockers"
                                type="radio"
                                checked={hasBlockers}
                                onChange={() => handleBlockersToggle(true)}
                                className="h-6 w-6 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                            />
                            <label htmlFor="blockers-yes" className="text-medium text-gray-700 font-medium cursor-pointer">Да</label>
                        </div>
                        {/* Радио-кнопка "Нет" */}
                        <div className="flex items-center gap-2">
                            <input
                                id="blockers-no"
                                name="hasBlockers"
                                type="radio"
                                checked={!hasBlockers}
                                onChange={() => handleBlockersToggle(false)}
                                className="h-6 w-6 text-indigo-600 bg-gray-100 border-gray-300 focus:ring-indigo-500 cursor-pointer"
                            />
                            <label htmlFor="blockers-no" className="text-medium text-gray-700 font-medium cursor-pointer">Нет</label>
                        </div>
                    </div>
                </div>
            </section>

            {form.approveStatus === "need-approval" && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="approverId" className="text-xl text-gray-700 font-medium">Утверждающий:</label>
                    <select
                        id="approverId"
                        name="approverId"
                        value={form.approverId}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="" disabled>Выберите утверждающего</option>
                        {users.map((u) => (
                            <option key={u.id} value={u.id}>
                                {u.name} {u.surname} {u.middlename} {u.roleID}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {hasBlockers && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="blockedBy" className="text-xl text-gray-700 font-medium">Блокирующие задачи</label>
                    <select
                        id="blockedBy"
                        name="blockedBy"
                        multiple
                        value={form.blockedBy}
                        onChange={handleBlockedByChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {tasks.map((t) => (
                            <option key={t.id} value={t.id}>
                                {t.dashboardId} {t.title} {t.description}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <div className="flex justify-center gap-4 mt-4">
                <button
                    type="button"
                    onClick={onCancel}
                    className="px-6 py-2 text-gray-700 bg-gray-200 rounded-4xl hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                    Отмена
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 text-white bg-indigo-900 rounded-4xl hover:bg-indigo-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                    disabled={loading}
                >
                    {loading ? "Обновление..." : "Сохранить изменения"}
                </button>
            </div>

            {success && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    Задача успешно обновлена!
                </div>
            )}
            {error && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-lg">
                    Ошибка: {error}
                </div>
            )}
        </form>
    );
};

export default TaskEditForm;