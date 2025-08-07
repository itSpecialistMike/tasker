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

/**
 * Определение типа для объекта контекста дашбордов.
 * Он предоставляет состояние и функции для управления выбранным дашбордом.
 */
interface DashboardContextType {
    selectedDashboardId: string;
    onDashboardChange: (id: string, options?: { navigate?: boolean }) => void;
    dashboards: Dashboard[];
    loading: boolean;
    error: Error | null;
    refetchDashboards: () => Promise<unknown>;
}

/**
 * Создание контекста с начальным значением undefined.
 * Этот контекст будет использоваться для передачи состояния дашбордов
 * всем дочерним компонентам, обернутым в DashboardProvider.
 */
export const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
);

/**
 * Определение типа для пропсов компонента DashboardProvider.
 * Он принимает ReactNode, который будет являться дочерними элементами.
 */
interface DashboardProviderProps {
    children: ReactNode;
}

/**
 * DashboardProvider - компонент-провайдер, который управляет состоянием дашбордов.
 * Он использует хуки для получения данных, управления выбранным дашбордом
 * и обработки навигации.
 */
export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
    // Получение экземпляра роутера для программной навигации.
    const router = useRouter();
    // Получение параметров из URL-строки.
    const searchParams = useSearchParams();

    // Кастомный хук для загрузки списка всех дашбордов.
    const {
        data: dashboards = [], // Список дашбордов, по умолчанию пустой массив.
        isLoading: loading,      // Флаг состояния загрузки.
        error,                   // Объект ошибки, если она произошла.
        refetch: refetchDashboards, // Функция для повторной загрузки данных.
    } = useFetchDashboards();

    // Состояние для хранения ID текущего выбранного дашборда.
    const [selectedDashboardId, setSelectedDashboardId] = useState<string>("");

    // Получение ID дашборда из URL-параметра 'dashboardId'.
    const dashboardIdFromUrl = searchParams?.get("dashboardId") ?? "";

    /**
     * Эффект, который выполняется один раз при загрузке данных,
     * чтобы установить начальный выбранный дашборд.
     */
    useEffect(() => {
        // Условие для инициализации:
        // - Загрузка завершена
        // - Список дашбордов не пуст
        // - selectedDashboardId еще не установлен
        if (!loading && dashboards.length > 0 && selectedDashboardId === "") {
            // Создание массива с валидными ID дашбордов.
            const validIds = dashboards.map(d => d.id);
            // Определение начального ID:
            // - Если ID из URL есть в списке валидных, используем его.
            // - Иначе, используем "all" (все дашборды).
            const initialId = validIds.includes(dashboardIdFromUrl) ? dashboardIdFromUrl : "all";
            // Установка начального ID.
            setSelectedDashboardId(initialId);
        }
    }, [loading, dashboards, dashboardIdFromUrl, selectedDashboardId]);

    /**
     * Функция-коллбэк для смены выбранного дашборда.
     * Она использует useCallback для предотвращения ненужного пересоздания.
     *
     * @param id - ID дашборда, который нужно выбрать.
     * @param options - Объект с опциями, например, флагом для навигации.
     */
    const onDashboardChange = useCallback(
        (id: string, options?: { navigate?: boolean }) => {
            // Если выбранный дашборд не изменился, выходим.
            if (id === selectedDashboardId) return;
            // Обновляем состояние с новым ID.
            setSelectedDashboardId(id);

            // Логика навигации, которая срабатывает, если передан флаг navigate.
            if (options?.navigate) {
                // Если выбран "all", переходим на корневую страницу.
                if (id === "all") {
                    router.push(`/`);
                } else {
                    // Иначе, переходим на страницу с параметром дашборда.
                    router.push(`/?dashboardId=${id}`);
                }
            }
        },
        [router, selectedDashboardId]
    );

    /**
     * Мемоизация значения контекста для оптимизации.
     * Предотвращает ненужные ререндеры дочерних компонентов.
     */
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

/**
 * Кастомный хук useDashboard для удобного доступа к контексту.
 * Проверяет, что хук используется внутри DashboardProvider.
 */
export const useDashboard = () => {
    const context = useContext(DashboardContext);
    if (!context) {
        throw new Error("useDashboard must be used within a DashboardProvider");
    }
    return context;
};