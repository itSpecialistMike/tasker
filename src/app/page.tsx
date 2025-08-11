// tasker/src/app/page.tsx
"use client";

import DashboardView from "@/components/dashBoardComponents/DashboardView";
import { useDashboard } from "@/hooks/useDashboard";
import { useUserContext } from "@/context/UserContext"; // <-- Исправлено: используем useUserContext
import UnauthorizedMessage from "@/components/UnauthorizedMessage";
import LoadingComp from "@/components/loadingComp";

export default function Home() {
    const { selectedDashboardId } = useDashboard();
    const { user, loading } = useUserContext(); // <-- Исправлено: получаем данные из контекста

    // Логика условного рендеринга
    if (loading) {
        return <LoadingComp />;
    }

    if (!user) {
        // Если пользователь не авторизован (user === null), отображаем соответствующее сообщение.
        return <UnauthorizedMessage />;
    }

    // Если пользователь авторизован, отображаем DashboardView.
    return (
        <div className="relative flex flex-col min-h-screen overflow-hidden">
            <main className="flex-grow">
                <DashboardView dashboardId={selectedDashboardId} />
            </main>
        </div>
    );
}