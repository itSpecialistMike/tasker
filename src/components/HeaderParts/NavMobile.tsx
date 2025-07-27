'use client';

import Link from 'next/link';
import { mockDashboards } from '@/mocks/dashboards';

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
  return (
    <div className="absolute top-16 left-0 w-full text-2xl bg-white shadow-md z-10 flex flex-col items-start px-6 py-4 space-y-4 md:hidden">
      <details className="w-full" open>
        <summary className="cursor-pointer text-gray-700 hover:text-blue-600">
          Дашборды
        </summary>
        <div className="ml-4 mt-2 space-y-1">
          {mockDashboards.map((db) => (
            <button
              key={db.id}
              className={`block text-sm text-left w-full ${
                db.id === selectedDashboardId
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-700 hover:text-blue-600'
              }`}
              onClick={() => {
                onDashboardChange(db.id);
                onClose();
              }}
            >
              {db.name}
            </button>
          ))}
        </div>
      </details>

      <Link
        href="/tasks"
        className="text-gray-700 hover:text-blue-600"
        onClick={onClose}
      >
        Мои задачи
      </Link>

      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full text-left">
        + Задача
      </button>

      <Link
        href="/profile"
        className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-sm font-medium"
        onClick={onClose}
      >
        :)
      </Link>
    </div>
  );
};

export default NavMobile;
