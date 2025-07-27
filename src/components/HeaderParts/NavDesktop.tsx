import Link from 'next/link';
import DashboardDropdown from './DashboardDropdown';

type Props = {
  selectedDashboardId: string;
  onDashboardChange: (id: string) => void;
};

const NavDesktop: React.FC<Props> = ({ selectedDashboardId, onDashboardChange }) => {
  return (
    <nav className="hidden md:flex items-center space-x-6 text-gray-700">
      <DashboardDropdown selectedId={selectedDashboardId} onChange={onDashboardChange} />
      <Link href="/tasks" className="hover:text-blue-600">
        Мои задачи
      </Link>
    </nav>
  );
};

export default NavDesktop;
