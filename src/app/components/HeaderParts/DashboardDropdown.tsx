'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { mockDashboards } from '@/app/mocks/dashboards';

const DashboardDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 hover:text-blue-600"
      >
        Дашборды <ChevronDown size={16} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-2 bg-white border shadow-lg rounded-lg z-50 w-48 py-2">
          {mockDashboards.map((db) => (
            <Link
              key={db.id}
              href={`/dashboards/${db.id}`}
              className="block px-4 py-2 hover:bg-gray-100 text-sm"
              onClick={() => setOpen(false)}
            >
              {db.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardDropdown;
