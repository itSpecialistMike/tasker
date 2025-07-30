// tasker/src/app/page.tsx
"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import DashboardView from "@/components/dashBoardComponents/DashboardView";
import Footer from "../components/Footer";
import { mockDashboards } from "@/mocks/dashboards";
// import HomeInfo from "@/components/HomeInfo";
// import { useUser } from '@/hooks/useUser'; // хук для определения авторизации



export default function Home() {
  const searchParams = useSearchParams();
  const dashboardIdFromQuery = searchParams.get("dashboardId");
  const defaultId = mockDashboards[0]?.id || "";

  const [selectedDashboardId, setSelectedDashboardId] = useState(dashboardIdFromQuery || defaultId);

  // Обновляем состояние при изменении параметра в URL
  useEffect(() => {
    if (dashboardIdFromQuery && dashboardIdFromQuery !== selectedDashboardId) {
      setSelectedDashboardId(dashboardIdFromQuery);
    }
  }, [dashboardIdFromQuery]);

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <Header selectedDashboardId={selectedDashboardId} onDashboardChange={setSelectedDashboardId} />
      <main className="flex-grow">
        {/* {!user && <HomeInfo />}
        {user && <div>Привет, {user.name}! Здесь ваш дашборд.</div>} */}
        <DashboardView dashboardId={selectedDashboardId} />
      </main>
      <Footer />
    </div>
  );
}
