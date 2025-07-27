// tasker/src/components/HeaderParts/NavDesktop.tsx
import Link from 'next/link';
import DashboardDropdown from './DashboardDropdown';

type Props = {
  selectedDashboardId: string;
  onDashboardChange: (id: string) => void;
};

const NavDesktop: React.FC<Props> = ({ selectedDashboardId, onDashboardChange }) => {
  return (
    <nav className="hidden md:flex items-center text-gray-700">
      <DashboardDropdown selectedId={selectedDashboardId} onChange={onDashboardChange} />
      <button className="flex items-center px-4 py-2 rounded-2xl hover:bg-gray-100 hover:scale-105 transform duration-300">
          Создать задачу
        </button>
      {/* <Link href="/tasks" className="hover:text-blue-600">
        Мои задачи
      </Link> */}
    </nav>
  );
};

export default NavDesktop;
