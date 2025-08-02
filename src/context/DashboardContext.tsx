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
import { useFetchDashboards } from "@/hooks/useFetchDashboards"; // ⬅️ импортируем реальный хук
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

export const DashboardProvider: React.FC<DashboardProviderProps> = ({
                                                                        children,
                                                                    }) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: dashboards = [], loading, error, refetchDashboards } = useFetchDashboards();

    // selectedDashboardId должен определяться после загрузки данных
    const [selectedDashboardId, setSelectedDashboardId] = useState<string>("");

    // Ждём загрузки данных и потом устанавливаем дефолтный ID
    useEffect(() => {
        if (!loading && dashboards.length > 0 && selectedDashboardId === "") {
            const urlId = searchParams?.get("dashboardId");
            const initialId = urlId ?? dashboards[0].id;
            setSelectedDashboardId(initialId);
        }
    }, [loading, dashboards, searchParams, selectedDashboardId]);


    const onDashboardChange = useCallback(
        (id: string) => {
            if (id === selectedDashboardId) return; // если тот же ID, ничего не делаем
            setSelectedDashboardId(id);
            router.push(`/?dashboardId=${id}`, undefined, { shallow: true });
        },
        [router, selectedDashboardId]
    );

    // мемоизация отбьекта
    const value = React.useMemo(() => ({
        selectedDashboardId,
        onDashboardChange,
        dashboards,
        loading,
        error,
        refetchDashboards,
    }), [selectedDashboardId, onDashboardChange, dashboards, loading, error, refetchDashboards]);

    return (
        <DashboardContext.Provider
            value={value}
        >

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
