import { useState, useEffect } from "react";
import { Dashboard } from '@/types/dashboard';
import { mockDashboards } from '@/mocks/dashboards';
import API from '@/lib/axios';

export const useFetchDashboards = () => {
    const fallbackDashboard: Dashboard[] = [
        { id: "all", name: "Все дашборды" } // используем id с маленькой буквы
    ];

    const [data, setData] = useState<Dashboard[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const useMocks = process.env.NEXT_PUBLIC_USE_MOCKS === 'true';

    // Функция для нормализации данных с любого формата ID/id в id
    const normalizeDashboards = (dashboardsFromBackend: any[]): Dashboard[] => {
        return dashboardsFromBackend.map(d => ({
            id: d.ID ?? d.id, // если есть ID - берем его, иначе id
            name: d.name,
            // если есть другие поля, добавь их здесь
        }));
    };

    const fetchDashboard = async () => {
        setLoading(true);
        setError(null);
        try {
            if (useMocks) {
                // нормализуем моковые данные тоже
                const dashboardsToSet = mockDashboards.length > 0 ? mockDashboards : fallbackDashboard;
                setData(normalizeDashboards(dashboardsToSet));
            } else {
                const response = await API.get('/showDB');
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setData(normalizeDashboards(response.data));
                } else {
                    setData(fallbackDashboard);
                }
            }
        } catch (error: any) {
            setError(error.message || 'Ошибка при загрузке дашбордов');
            setData(fallbackDashboard);
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
