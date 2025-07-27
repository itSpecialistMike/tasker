// tasker/src/components/HeaderParts/NavMobile.tsx
'use client';

import { mockDashboards } from '@/mocks/dashboards';
import ProfileButton from './ProfileButton';
import { useRouter } from 'next/navigation';

type Props = {
  onClose: () => void;
  selectedDashboardId: string;
  onDashboardChange: (id: string) => void;
};

const NavMobile: React.FC<Props> = ({
  onClose,
  selectedDashboardId,
  onDashboardChange,
}) => {
  const router = useRouter();

  const handleDashboardSelect = (id: string) => {
    onDashboardChange(id);
    onClose();
    router.push(`/?dashboardId=${id}`);
  };

  return (
    <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 flex flex-col items-start px-6 py-4 space-y-4 md:hidden">
      <details className="w-full" open>
        <summary className="cursor-pointer text-gray-700 text-3xl">
          Дашборды
        </summary>
        <div className="ml-4 mt-2 space-y-1">
          {mockDashboards.map((db) => (
            <button
              key={db.id}
              className={`block text-left text-2xl w-full ${
                db.id === selectedDashboardId
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700'
              }`}
              onClick={() => handleDashboardSelect(db.id)}
            >
              {db.name}
            </button>
          ))}
        </div>
      </details>
      <div className="flex items-center justify-self-auto space-x-4 w-full">
        <button className="bg-indigo-900 text-white text-2xl text-center px-4 py-2 rounded-2xl transition">
          Создать задачу
        </button>
        <ProfileButton />
      </div>
    </div>
  );
};

export default NavMobile;
