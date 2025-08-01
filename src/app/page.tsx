// tasker/src/app/page.tsx
"use client";

import DashboardView from "@/components/dashBoardComponents/DashboardView";
import Footer from "../components/Footer";
import { useDashboard } from "@/hooks/useDashboard"; // ✔️ Импортируем хук

export default function Home() {
    const { selectedDashboardId } = useDashboard(); // ✔️ Получаем ID из контекста

    return (
        <div className="relative flex flex-col min-h-screen overflow-hidden">
            {/* ❌ Header был перемещен в layout.tsx */}
            <main className="flex-grow">
                <DashboardView dashboardId={selectedDashboardId} />
            </main>
        </div>
    );
}
