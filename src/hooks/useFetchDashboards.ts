// src/hooks/useFetchDashboards.ts
import { useState, useEffect } from "react";
import { Dashboard } from '@/types/dashboard';
import API from '@/lib/axios';

export const useFetchDashboards = () => {
    const [data, setData] = useState<Dashboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Нормализация ID в формат с маленькой буквы
    const normalizeDashboards = (dashboardsFromBackend: any[]): Dashboard[] => {
        return dashboardsFromBackend.map(d => ({
            id: d.ID ?? d.id,
            name: d.name,
        }));
    };

    const fetchDashboard = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await API.get('/showDB');

            const dashboards = Array.isArray(response.data)
                ? normalizeDashboards(response.data)
                : [];

            // Всегда добавляем "Все дашборды" в начало
            setData([{ id: "all", name: "Все дашборды" }, ...dashboards]);
        } catch (error: any) {
            setError(error.message || 'Ошибка при загрузке дашбордов');
            // Даже в случае ошибки "Все дашборды" остаётся
            setData([{ id: "all", name: "Все дашборды" }]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboard();
    }, []);

    return {
        data,
        loading,
        error,
        refetchDashboards: fetchDashboard,
    };
};
