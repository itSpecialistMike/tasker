// tasker/src/components/HeaderParts/DashboardDropdown.tsx
// Этот файл содержит компонент DashboardDropdown, который позволяет пользователю выбирать дашборд в приложении Tasker
"use client";

/**
 * Импортируем:
 * - useState: хук React для управления состоянием компонента
 * - ChevronDown: иконка из библиотеки lucide-react
 * - mockDashboards: список дашбордов (моковые данные)
 * - useRouter: хук Next.js для программной навигации
 * - AnimatePresence, motion: компоненты для анимации из framer-motion
 */
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { mockDashboards } from "@/mocks/dashboards";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Тип пропсов для DashboardDropdown:
 * - selectedId: ID текущего выбранного дашборда
 * - onChange: необязательный колбэк при выборе другого дашборда
 */
type Props = {
  selectedId: string;
  onChange?: (id: string) => void;
};

/**
 * Компонент DashboardDropdown:
 * - Выпадающее меню выбора дашборда
 * - Использует framer-motion для анимации
 * - Обновляет состояние и навигацию при выборе
 */
const DashboardDropdown: React.FC<Props> = ({ selectedId, onChange }) => {
  /**
   * Состояние открытия выпадающего списка
   */
  const [open, setOpen] = useState(false);

  /**
   * Получаем выбранный дашборд из моков по ID
   */
  const selectedDashboard = mockDashboards.find((d) => d.id === selectedId);

  /**
   * Хук маршрутизации от Next.js
   */
  const router = useRouter();

  /**
   * Обработка выбора нового дашборда:
   * - вызываем внешний обработчик (если он передан)
   * - закрываем список
   * - навигируем на новую страницу с параметром dashboardId
   */
  const handleSelect = (id: string) => {
    onChange?.(id);
    setOpen(false);
    router.push(`/?dashboardId=${id}`);
  };

  return (
    /**
     * Обертка для дропдауна:
     * - позиционируется как inline-block
     */
    <div className="relative inline-block">
      {/** Кнопка открытия/закрытия выпадающего меню */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 px-4 py-2 rounded-2xl hover:bg-gray-100 hover:scale-105 transform duration-300"
        aria-haspopup="listbox"
        aria-expanded={open}
        type="button"
      >
        {/** Отображение названия текущего дашборда или placeholder */}
        {selectedDashboard?.name || "Выберите дашборд"}{" "}
        <ChevronDown size={16} />
      </button>

      {/** Анимированное выпадающее меню */}
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
            {/** Список дашбордов */}
            {mockDashboards.map((db) => (
              <button
                key={db.id}
                role="option"
                aria-selected={db.id === selectedId}
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

/**
 * Экспорт компонента DashboardDropdown
 * - используется в Header или других местах, где требуется выбор дашборда
 */
export default DashboardDropdown;
