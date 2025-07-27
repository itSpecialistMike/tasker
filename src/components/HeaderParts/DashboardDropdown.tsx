"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { mockDashboards } from "@/mocks/dashboards";
import { useRouter } from "next/navigation";

type Props = {
  selectedId: string;
  onChange?: (id: string) => void;
};

const DashboardDropdown: React.FC<Props> = ({ selectedId, onChange }) => {
  const [open, setOpen] = useState(false);
  const selectedDashboard = mockDashboards.find((d) => d.id === selectedId);
  const router = useRouter();

  const handleSelect = (id: string) => {
    onChange?.(id);
    setOpen(false);
    router.push(`/?dashboardId=${id}`);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-4 py-2 rounded-2xl hover:bg-gray-100"
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
      >
        {selectedDashboard?.name || "Выберите дашборд"} <ChevronDown size={16} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute mt-1 bg-white rounded-2xl shadow w-48 z-50 overflow-hidden"
        >
          {mockDashboards.map((db) => (
            <button
              key={db.id}
              role="option"
              aria-selected={db.id === selectedId}
              onClick={() => handleSelect(db.id)}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
              type="button"
            >
              {db.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashboardDropdown;
