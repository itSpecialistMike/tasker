// tasker/src/hooks/useFetchDashboards.ts
import { useQuery } from '@tanstack/react-query';
import API from '@/lib/axios';
import { Dashboard } from '@/types/dashboard';
import axios from 'axios';

interface UseFetchDashboardsOptions {
    enabled?: boolean;
}

const normalizeDashboards = (dashboardsFromBackend: any[]): Dashboard[] => {
    return dashboardsFromBackend.map(d => ({
        id: d.ID ?? d.id,
        name: d.name,
    }));
};

export const useFetchDashboards = (options: UseFetchDashboardsOptions = {}) => {
    const { enabled = true } = options;
    const query = useQuery<Dashboard[], Error>({
        queryKey: ['dashboards'],
        queryFn: async () => {
            try {
                const response = await API.get('/showDB');
                if (!Array.isArray(response.data)) return [];
                return [{ id: 'all', name: 'Все дашборды' }, ...normalizeDashboards(response.data)];
            } catch (e) {
                // Оптимизация: если ошибка 401, не выбрасываем ее дальше.
                if (axios.isAxiosError(e) && e.response?.status === 401) {
                    return [];
                }
                throw e; // Выбрасываем другие, непредвиденные ошибки
            }
        },
        enabled, // <-- Хук будет работать только если `enabled` === true
        // Отключаем повторные попытки для ожидаемых ошибок
        retry: false,
    });

    return query;
};