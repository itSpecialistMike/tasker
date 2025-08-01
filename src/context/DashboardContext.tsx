// tasker/src/context/DashboardContext.tsx
"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { mockDashboards } from "@/mocks/dashboards";

// Определяем интерфейс для нашего контекста
interface DashboardContextType {
    selectedDashboardId: string;
    onDashboardChange: (id: string) => void;
}

// Создаем контекст с начальными значениями по умолчанию
export const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

// Определяем тип для пропсов провайдера
interface DashboardProviderProps {
    children: ReactNode;
}

/**
 * Компонент-провайдер для контекста дашборда.
 * Оборачивает дочерние компоненты и предоставляет им доступ
 * к состоянию выбранного дашборда и функции для его изменения.
 */
export const DashboardProvider: React.FC<DashboardProviderProps> = ({
                                                                        children,
                                                                    }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Получаем начальный dashboardId из URL-параметров.
    const initialDashboardId = searchParams
        ? searchParams.get("dashboardId") || mockDashboards[0].id
        : mockDashboards[0].id;

    const [selectedDashboardId, setSelectedDashboardId] = useState<string>(
        initialDashboardId
    );

    // ✔️ Используем useCallback для мемоизации onDashboardChange.
    // Это предотвратит бесконечный цикл в useEffect, так как функция
    // будет создана только один раз (при первом рендере) и не будет меняться.
    const onDashboardChange = useCallback((id: string) => {
        setSelectedDashboardId(id);
        // Обновляем URL-параметр при смене дашборда
        router.push(`/?dashboardId=${id}`);
    }, [router]); // Зависимость: router

    return (
        <DashboardContext.Provider value={{ selectedDashboardId, onDashboardChange }}>
            {children}
        </DashboardContext.Provider>
    );
};

/**
 * Кастомный хук для удобного доступа к контексту дашборда.
 * Вызывает ошибку, если используется вне DashboardProvider.
 */
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
};
