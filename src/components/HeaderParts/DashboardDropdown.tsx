"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useDashboard } from "@/hooks/useDashboard";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Компонент DashboardDropdown:
 * - Выпадающее меню выбора дашборда
 */
const DashboardDropdown: React.FC = () => {
    const { dashboards, selectedDashboardId, onDashboardChange, loading } = useDashboard();
    console.log("selectedDashboardId:", selectedDashboardId);
    // console.log("dashboards:", dashboards);

    const [open, setOpen] = useState(false);

    if (loading) {
        return (
            <button disabled className="px-4 py-2">
                Загрузка...
            </button>
        );
    }

    if (dashboards.length === 0) {
        return (
            <button disabled className="px-4 py-2">
                Дашборды не найдены
            </button>
        );
    }

    const selectedDashboard = dashboards.find((d) => d.id === selectedDashboardId);

    const handleSelect = (id: string) => {
        setOpen(false);
        onDashboardChange(id);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => {setOpen((o) => !o); console.log("open =", !open);}}
                className="flex items-center gap-1 px-4 py-2 rounded-2xl hover:bg-gray-100 hover:scale-105 transform duration-300"
                aria-haspopup="listbox"
                aria-expanded={open}
                type="button"
            >
                {selectedDashboard ? selectedDashboard.name : "Выберите дашборд"}
                <ChevronDown size={16} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        role="listbox"
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="absolute mt-1 bg-white rounded-2xl shadow w-48 z-50 overflow-hidden origin-top"
                    >
                        {dashboards.map((db) => (
                            <button
                                key={db.id}
                                role="option"
                                aria-selected={db.id === selectedDashboardId}
                                onClick={() => handleSelect(db.id)}
                                className="w-full text-left px-4 py-2 hover:bg-gray-200 transition"
                                type="button"
                            >
                                {db.name}
                            </button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default DashboardDropdown;
