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

        // НОВАЯ ОТЛАДКА: Выводим массив выбранных ID в консоль
        console.log("Выбранные блокирующие задачи (ID):", selected);

        setForm((prev) => ({ ...prev, blockedBy: selected }));
    };

    const handleBlockersToggle = (isYes: boolean) => {
        setHasBlockers(isYes);
        if (!isYes) {
            setForm((prev) => ({ ...prev, blockedBy: [] }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 💡 ИСПРАВЛЕНИЕ: Создаем payload более надежным способом
        // Мы явно проверяем, есть ли блокирующие задачи
        const payload: CreateTaskPayload = {
            title: form.title,
            description: form.description,
            deadline: form.deadline,
            dashboardID: form.dashboardId,
            reporterID: form.reporterId,
            approveStatus: form.approveStatus,
            approverID: form.approverId,
            // Если hasBlockers === false, отправляем пустой массив
            blockers: hasBlockers ? form.blockedBy : [],
        };

        // 🚀 ОТЛАДКА: Выводим payload в консоль, чтобы проверить, что отправляется
        console.log("Payload перед отправкой:", payload);

        // 2. Отправка данных через хук
        await createTask(payload);

        // 3. Обработка успешного ответа
        if (success && onSuccess) {
            onSuccess();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6 w-full flex flex-col gap-6 bg-white">
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
                        {tasks.map((task) => (
                            <option key={task.id} value={task.id}>
                                {task.dashboardId} {task.title} {task.description}
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