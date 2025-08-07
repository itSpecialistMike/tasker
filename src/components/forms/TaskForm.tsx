// components/TaskForm.tsx
"use client";

import React, { useState, useEffect } from "react";
import { useTasks } from "@/hooks/useTasks";
import { useFetchDashboards } from "@/hooks/useFetchDashboards";
import { useUser } from "@/hooks/useUser";
import { useUsers } from "@/hooks/useUsers";
import { useCreateTask, CreateTaskPayload } from "@/hooks/useCreateTask";
import { TaskFormData} from "@/types/TaskFormData";

interface Props {
    onSuccess?: () => void;
}

// Тип данных для внутреннего состояния формы


const TaskForm: React.FC<Props> = ({ onSuccess }) => {
    const { tasks } = useTasks();
    const { data: dashboards = [] } = useFetchDashboards();
    const { user } = useUser();
    const { users } = useUsers();


    const { createTask, loading, success, error } = useCreateTask();

    const [form, setForm] = useState<TaskFormData>({
        title: "",
        description: "",
        deadline: "",
        reporterId: "",
        approverId: "",
        approveStatus: "approved", // По умолчанию: approved
        dashboardId: "",
        blockedBy: [],
    });

    const [hasBlockers, setHasBlockers] = useState(false);

    // Установка начальных значений reporterId и approverId
    useEffect(() => {
        if (user?.id) {
            setForm((prev) => ({
                ...prev,
                reporterId: String(user.id),
                approverId: String(user.id), // По умолчанию: id текущего пользователя
            }));
        }
    }, [user]);

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleBlockedByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
        setForm((prev) => ({ ...prev, blockedBy: selected }));
    };

    const handleBlockersToggle = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const isYes = e.target.value === "yes";
        setHasBlockers(isYes);
        if (!isYes) {
            setForm((prev) => ({ ...prev, blockedBy: [] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Преобразование данных формы в payload для API
        const payload: CreateTaskPayload = {
            title: form.title,
            description: form.description,
            deadline: form.deadline,
            dashboardID: form.dashboardId,
            reporterID: form.reporterId,
            approveStatus: form.approveStatus,
            approverID: form.approverId,
            blockers: form.blockedBy,
        };

        // 2. Отправка данных через хук
        // isMock установлен в true, чтобы имитировать запрос без реального эндпоинта
        await createTask(payload);

        // 3. Обработка успешного ответа
        if (success && onSuccess) {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 w-full flex flex-col gap-6 bg-white">
            <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-gray-700 font-medium">Название задачи</label>
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

            <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-gray-700 font-medium">Описание</label>
                <textarea
                    id="description"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                    placeholder="Детальное описание задачи..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y min-h-[100px]"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="deadline" className="text-gray-700 font-medium">Дедлайн</label>
                <input
                    id="deadline"
                    name="deadline"
                    type="datetime-local"
                    value={form.deadline}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="dashboardId" className="text-gray-700 font-medium">Дашборд</label>
                <select
                    id="dashboardId"
                    name="dashboardId"
                    value={form.dashboardId}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="" disabled>Выберите дашборд</option>
                    {dashboards
                        .filter((db) => db.id !== 'all')
                        .map((db) => (
                            <option key={db.id} value={db.id}>{db.name}</option>
                        ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="requireApproval" className="text-gray-700 font-medium">Требуется согласование?</label>
                <select
                    id="requireApproval"
                    value={form.approveStatus === "need-approval" ? "yes" : "no"}
                    onChange={(e) => {
                        setForm((prev) => ({
                            ...prev,
                            approveStatus: e.target.value === "yes" ? "need-approval" : "approved",
                        }));
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="yes">Да</option>
                    <option value="no">Нет</option>
                </select>
            </div>

            {form.approveStatus === "need-approval" && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="approverId" className="text-gray-700 font-medium">Утверждающий</label>
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

            <div className="flex flex-col gap-2">
                <label htmlFor="hasBlockers" className="text-gray-700 font-medium">Есть блокирующие задачи?</label>
                <select
                    id="hasBlockers"
                    value={hasBlockers ? "yes" : "no"}
                    onChange={handleBlockersToggle}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="no">Нет</option>
                    <option value="yes">Да</option>
                </select>
            </div>

            {hasBlockers && (
                <div className="flex flex-col gap-2">
                    <label htmlFor="blockedBy" className="text-gray-700 font-medium">Блокирующие задачи</label>
                    <select
                        id="blockedBy"
                        name="blockedBy"
                        multiple
                        value={form.blockedBy}
                        onChange={handleBlockedByChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-white h-40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {tasks.map((task) => (
                            <option key={task.id} value={task.id}>
                                {task.title}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            <button
                type="submit"
                className="w-full mt-4 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
                disabled={loading}
            >
                {loading ? "Создание..." : "Создать задачу"}
            </button>

            {success && (
                <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-lg">
                    Задача успешно создана!
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

export default TaskForm;
