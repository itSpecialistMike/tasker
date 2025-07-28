// tasker/src/components/HeaderParts/NavDesktop.tsx

/**
 * Импортируем:
 * - Link: компонент маршрутизации от Next.js (используется для навигации)
 * - DashboardDropdown: компонент выпадающего списка для выбора дашборда
 */
import Link from 'next/link';
import DashboardDropdown from './DashboardDropdown';

/**
 * Тип пропсов для NavDesktop:
 * - selectedDashboardId: ID текущего выбранного дашборда
 * - onDashboardChange: функция-обработчик изменения выбранного дашборда
 */
type Props = {
  selectedDashboardId: string;
  onDashboardChange: (id: string) => void;
};

/**
 * Компонент NavDesktop:
 * - Отображает навигационное меню в десктопной версии (md и выше)
 * - Включает выпадающий список дашбордов и кнопку "Создать задачу"
 * - (Опционально) содержит ссылку на "Мои задачи"
 */
const NavDesktop: React.FC<Props> = ({ selectedDashboardId, onDashboardChange }) => {
  return (
    /**
     * Навигационное меню:
     * - скрыто на мобильных (hidden md:flex)
     * - выровнено по центру вертикально
     */
    <nav className="hidden md:flex items-center text-gray-700">

      {/** Выпадающий список дашбордов */}
      <DashboardDropdown selectedId={selectedDashboardId} onChange={onDashboardChange} />

      {/** Кнопка создания новой задачи */}
      <button className="flex items-center px-4 py-2 rounded-2xl hover:bg-gray-100 hover:scale-105 transform duration-300">
        Создать задачу
      </button>
    </nav>
  );
};

/**
 * Экспорт NavDesktop:
 * - используется в шапке (Header) для отображения навигации на больших экранах
 */
export default NavDesktop;
