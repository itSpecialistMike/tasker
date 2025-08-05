import { useQuery } from '@tanstack/react-query';
import API from '@/lib/axios';
import { Dashboard } from '@/types/dashboard';

const normalizeDashboards = (dashboardsFromBackend: any[]): Dashboard[] => {
    return dashboardsFromBackend.map(d => ({
        id: d.ID ?? d.id,
        name: d.name,
    }));
};

export const useFetchDashboards = () => {
    const query = useQuery<Dashboard[], Error>({
        queryKey: ['dashboards'],
        queryFn: async () => {
            const response = await API.get('/showDB');
            if (!Array.isArray(response.data)) return [];
            return [{ id: 'all', name: 'Все дашборды' }, ...normalizeDashboards(response.data)];
        },
    });

    if (query.error) {
        console.error('Ошибка при загрузке дашбордов:', query.error);
    }

    return query;
};

