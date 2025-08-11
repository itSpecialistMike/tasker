// tasker/src/context/DashboardContext.tsx
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
import { useFetchDashboards } from "@/hooks/useFetchDashboards";
import { DashboardContextType } from "@/types/dashboardContextType";
import { useUserContext } from "./UserContext"; // <-- Импортируем UserContext

export const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

interface DashboardProviderProps {
    children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Получаем статус пользователя из UserContext
    const { user, loading: userLoading } = useUserContext();

    // Передаем `enabled` в useFetchDashboards, чтобы он работал только для авторизованных пользователей
    const {
        data: dashboards = [],
        isLoading: dashboardsLoading,
        error,
        refetch: refetchDashboards,
    } = useFetchDashboards({ enabled: !!user }); // Запрос выполняется только если user не null

    const [selectedDashboardId, setSelectedDashboardId] = useState<string | null>(null);

    // ... остальная часть кода остается без изменений ...

    useEffect(() => {
        const idFromUrl = searchParams.get("dashboardId");
        if (idFromUrl) {
            setSelectedDashboardId(idFromUrl);
        } else if (dashboards.length > 0) {
            setSelectedDashboardId(dashboards[0].id);
        }
    }, [searchParams, dashboards]);

    const onDashboardChange = useCallback(
        (id: string, options?: { navigate?: boolean }) => {
            setSelectedDashboardId(id);
            if (options?.navigate) {
                if (id === "all") {
                    router.push(`/`);
                } else {
                    router.push(`/?dashboardId=${id}`);
                }
            }
        },
        [router, selectedDashboardId]
    );

    const loading = userLoading || dashboardsLoading;

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
    if (!context) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
};