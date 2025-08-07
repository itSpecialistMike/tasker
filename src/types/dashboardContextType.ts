import { Dashboard } from "./dashboard";
/**
 * Определение типа для объекта контекста дашбордов.
 * Он предоставляет состояние и функции для управления выбранным дашбордом.
 */
export interface DashboardContextType {
    selectedDashboardId: string;
    onDashboardChange: (id: string, options?: { navigate?: boolean }) => void;
    dashboards: Dashboard[];
    loading: boolean;
    error: Error | null;
    refetchDashboards: () => Promise<unknown>;
}