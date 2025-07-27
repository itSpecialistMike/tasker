// tasker/src/app/page.tsx
'use client';

import { useState } from 'react';
import Header from '../components/Header';
import DashboardView from '../components/DashboardView';
import Footer from '../components/Footer';
import BackgroundBlur from '../components/BackgroundBlur';
import { mockDashboards } from '@/mocks/dashboards';

export default function Home() {
  const [selectedDashboardId, setSelectedDashboardId] = useState(mockDashboards[0]?.id || '');

  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      <BackgroundBlur />
      <Header
        selectedDashboardId={selectedDashboardId}
        onDashboardChange={setSelectedDashboardId}
      />
      <main className="flex-grow">
        <DashboardView dashboardId={selectedDashboardId} />
      </main>
      <Footer />
    </div>
  );
}
