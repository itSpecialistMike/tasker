import Link from 'next/link';
import DashboardDropdown from './DashboardDropdown';

const NavDesktop = () => {
  return (
    <nav className="hidden md:flex items-center space-x-6 text-gray-700">
      <DashboardDropdown />
      <Link href="/tasks" className="hover:text-blue-600">
        Мои задачи
      </Link>
    </nav>
  );
};

export default NavDesktop;
