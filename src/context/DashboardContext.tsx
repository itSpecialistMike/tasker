"use client";

import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useCallback,
    useEffect,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useFetchDashboards } from "@/hooks/useFetchDashboards"; // Импортируем хук для загрузки дашбордов
import { Dashboard } from "@/types/dashboard";

interface DashboardContextType {
    selectedDashboardId: string;
    onDashboardChange: (id: string) => void;
    dashboards: Dashboard[];
    loading: boolean;
    error: string | null;
    refetchDashboards: () => Promise<void>;
}

export const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

interface DashboardProviderProps {
    children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: dashboards = [], loading, error, refetchDashboards } = useFetchDashboards();

    // Локальное состояние выбранного дашборда
    const [selectedDashboardId, setSelectedDashboardId] = useState<string>("");

    // Считываем ID из URL (если есть)
    const dashboardIdFromUrl = searchParams?.get("dashboardId") ?? "";

    // Устанавливаем выбранный дашборд после загрузки данных
    useEffect(() => {
        if (!loading && dashboards.length > 0 && selectedDashboardId === "") {
            const initialId = dashboardIdFromUrl || dashboards[0].id;
            setSelectedDashboardId(initialId);
        }
    }, [loading, dashboards.length, dashboardIdFromUrl, selectedDashboardId]);

    // Обработчик смены дашборда, обновляет состояние и URL
    const onDashboardChange = useCallback(
        (id: string) => {
            if (id === selectedDashboardId) return; // Если выбран тот же дашборд, не делаем ничего
            setSelectedDashboardId(id);
            router.push(`/?dashboardId=${id}`, undefined, { shallow: true });
        },
        [router, selectedDashboardId]
    );

    // Мемоизируем значение контекста, чтобы не создавать его заново без нужды
    const value = React.useMemo(
        () => ({
            selectedDashboardId,
            onDashboardChange,
            dashboards,
            loading,
            error,
            refetchDashboards,
        }),
        [selectedDashboardId, onDashboardChange, dashboards, loading, error, refetchDashboards]
    );

    return (
        <DashboardContext.Provider value={value}>
            {children}
        </DashboardContext.Provider>
    );
};

export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (context === undefined) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
};
