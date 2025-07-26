"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  BadgeCheck,
  Hourglass,
  XCircle,
  CheckCircle,
} from "lucide-react";
import clsx from "clsx";
import { mockTasks } from "../mocks/tasks";
import { mockUsers } from "../mocks/users";

// Типы
type TaskStatus =
  | "to-do"
  | "in-progress"
  | "review"
  | "blocked"
  | "done"
  | "canceled";

type SortableStatus = "to-do" | "in-progress" | "done" | "canceled";

type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  reporterId: string;
  assignerId: string | null;
  reviewerId: string | null;
  approverId: string;
  approveStatus: string;
  createdAt: string;
  startedAt: string | null;
  completedAt: string | null;
  deadline: string;
  dashboardId: string;
  blockedBy: string[];
};

type SortField = "status" | "deadline" | "createdAt" | null;
type SortOrder = "asc" | "desc" | null;

// Хелпер
const findUser = (id: string) =>
  mockUsers.find((u) => u.id === id)?.name || "—";

// Поддерживаемые стили и иконки только для sortable статусов
const statusStyles: Record<SortableStatus, string> = {
  "to-do": "bg-gray-200 text-gray-800",
  "in-progress": "bg-yellow-200 text-yellow-800",
  done: "bg-green-200 text-green-800",
  canceled: "bg-red-200 text-red-800",
};

const statusIcons: Record<SortableStatus, React.ReactNode> = {
  "to-do": <Hourglass size={16} />,
  "in-progress": <BadgeCheck size={16} />,
  done: <CheckCircle size={16} />,
  canceled: <XCircle size={16} />,
};

const statusOrder: SortableStatus[] = [
  "to-do",
  "in-progress",
  "done",
  "canceled",
];

const isSortableStatus = (status: string): status is SortableStatus =>
  statusOrder.includes(status as SortableStatus);

// Клиентская дата
const ClientDate: React.FC<{ dateStr: string }> = ({ dateStr }) => {
  const [dateString, setDateString] = useState("");

  useEffect(() => {
    setDateString(new Date(dateStr).toLocaleString());
  }, [dateStr]);

  return <>{dateString}</>;
};

// Основной компонент
const MainDash: React.FC = () => {
  const [sortField, setSortField] = useState<SortField>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>(null);

  const toggleSort = (field: SortField) => {
    if (sortField !== field) {
      setSortField(field);
      setSortOrder("asc");
    } else {
      if (sortOrder === "asc") setSortOrder("desc");
      else if (sortOrder === "desc") {
        setSortField(null);
        setSortOrder(null);
      } else {
        setSortOrder("asc");
      }
    }
  };

  const sortedTasks = useMemo(() => {
    if (!sortField || !sortOrder) return mockTasks;

    return [...mockTasks].sort((a, b) => {
      let comp = 0;

      if (sortField === "status") {
        const aStatus = isSortableStatus(a.status) ? a.status : "to-do";
        const bStatus = isSortableStatus(b.status) ? b.status : "to-do";
        comp =
          statusOrder.indexOf(aStatus) - statusOrder.indexOf(bStatus);
      } else if (sortField === "deadline") {
        comp =
          new Date(a.deadline).getTime() -
          new Date(b.deadline).getTime();
      } else if (sortField === "createdAt") {
        comp =
          new Date(a.createdAt).getTime() -
          new Date(b.createdAt).getTime();
      }

      return sortOrder === "asc" ? comp : -comp;
    });
  }, [sortField, sortOrder]);

  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return "⇅";
    if (sortOrder === "asc") return "↑";
    if (sortOrder === "desc") return "↓";
    return "⇅";
  };

  return (
    <section className="bg-white shadow-2xl rounded-4xl p-6 mt-6 mx-auto max-w-6xl">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        🗂️ Мои задачи (Главный дашборд)
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border-collapse">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs cursor-pointer select-none">
            <tr>
              <th className="px-4 py-2">Задача</th>
              <th
                className="px-4 py-2"
                onClick={() => toggleSort("status")}
                title="Сортировка по статусу"
              >
                Статус {getSortIndicator("status")}
              </th>
              <th
                className="px-4 py-2"
                onClick={() => toggleSort("deadline")}
                title="Сортировка по дедлайну"
              >
                Дедлайн {getSortIndicator("deadline")}
              </th>
              <th
                className="px-4 py-2"
                onClick={() => toggleSort("createdAt")}
                title="Сортировка по времени создания"
              >
                Создано {getSortIndicator("createdAt")}
              </th>
              <th className="px-4 py-2">Исполнитель</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {sortedTasks.map((task) => {
              const status = isSortableStatus(task.status)
                ? task.status
                : null;

              return (
                <tr
                  key={task.id}
                  className="hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {task.title}
                  </td>
                  <td className="px-4 py-3">
                    {status ? (
                      <span
                        className={clsx(
                          "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold",
                          statusStyles[status]
                        )}
                      >
                        {statusIcons[status]} {status}
                      </span>
                    ) : (
                      <span className="text-gray-500 italic">
                        {task.status}
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {task.deadline}
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    <ClientDate dateStr={task.createdAt} />
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {findUser(task.assignerId ?? "")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MainDash;
