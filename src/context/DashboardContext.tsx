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
import { Dashboard } from "@/types/dashboard";

interface DashboardContextType {
    selectedDashboardId: string;
    onDashboardChange: (id: string, options?: { navigate?: boolean }) => void;
    dashboards: Dashboard[];
    loading: boolean;
    error: Error | null;
    refetchDashboards: () => Promise<unknown>;
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

    const {
        data: dashboards = [],
        isLoading: loading,
        error,
        refetch: refetchDashboards,
    } = useFetchDashboards();

    const [selectedDashboardId, setSelectedDashboardId] = useState<string>("");

    const dashboardIdFromUrl = searchParams?.get("dashboardId") ?? "";

    useEffect(() => {
        if (!loading && dashboards.length > 0 && selectedDashboardId === "") {
            const validIds = dashboards.map(d => d.id);
            const initialId = validIds.includes(dashboardIdFromUrl) ? dashboardIdFromUrl : "all";
            setSelectedDashboardId(initialId);
        }
    }, [loading, dashboards, dashboardIdFromUrl, selectedDashboardId]);

    const onDashboardChange = useCallback(
        (id: string, options?: { navigate?: boolean }) => {
            console.log('onDashboardChange', id, 'navigate:', options?.navigate);
            if (id === selectedDashboardId) return;
            setSelectedDashboardId(id);

            // Corrected navigation logic.
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