import Link from 'next/link';

const mockDashboards = [
  { id: 1, name: 'Маркетинг' },
  { id: 2, name: 'Разработка' },
  { id: 3, name: 'Продажи' },
];

const NavMobile = ({ onClose }: { onClose: () => void }) => {
  return (
    <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 flex flex-col items-start px-6 py-4 space-y-4 md:hidden">
      <details className="w-full">
        <summary className="cursor-pointer text-gray-700 hover:text-blue-600">
          Дашборды
        </summary>
        <div className="ml-4 mt-2 space-y-1">
          {mockDashboards.map((db) => (
            <Link
              key={db.id}
              href={`/dashboards/${db.id}`}
              className="block text-sm text-gray-700 hover:text-blue-600"
              onClick={onClose}
            >
              {db.name}
            </Link>
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
