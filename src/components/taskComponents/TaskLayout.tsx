// tasker/src/components/taskComponents/TaskLayout.tsx
'use client';

import Header from '../Header';
import Footer from '../Footer';
import BackgroundBlur from '../BackgroundBlur';

type Props = {
  children: React.ReactNode;
  selectedDashboardId: string;
};

export default function TaskLayout({ children, selectedDashboardId }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
        <BackgroundBlur />
      <Header
        selectedDashboardId={selectedDashboardId}
        onDashboardChange={() => {}} // Можно либо передать пустую функцию, либо реализовать смену
      />

      <main className="flex-1 px-4 py-8 max-w-6xl mx-auto w-full ">
        <div className="bg-white p-6 rounded-4xl shadow-2xl border border-gray-200">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
