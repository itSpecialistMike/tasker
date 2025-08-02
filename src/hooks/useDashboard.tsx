
// tasker/src/hooks/useDashboard.tsx
"use client";

import { useContext } from "react";
// ✔️ Импортируем сам контекст из его файла
import { DashboardContext } from "@/context/DashboardContext";

/**
 * Кастомный хук для удобного доступа к контексту дашборда.
 * Вызывает ошибку, если используется вне DashboardProvider.
 */
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context; // должно возвращать selectedDashboardId, onDashboardChange, dashboards, loading
};
