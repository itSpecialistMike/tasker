"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { mockDashboards } from "@/mocks/dashboards";

type Props = {
  selectedId: string;
  onChange?: (id: string) => void;
};

const DashboardDropdown: React.FC<Props> = ({ selectedId, onChange }) => {
  const [open, setOpen] = useState(false);
  const selectedDashboard = mockDashboards.find((d) => d.id === selectedId);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-4 py-2 rounded hover:bg-gray-100"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {selectedDashboard?.name || "Выберите дашборд"} <ChevronDown size={16} />
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute mt-1 bg-white rounded shadow w-48 z-50"
        >
          {mockDashboards.map((db) => (
            <button
              key={db.id}
              role="option"
              aria-selected={db.id === selectedId}
              onClick={() => {
                onChange?.(db.id);
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-200"
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
