// tasker/src/components/HeaderParts/NavMobile.tsx
// Этот файл содержит компонент NavMobile для мобильной навигации в приложении Tasker
"use client";

/**
 * Импортируем:
 * - mockDashboards: список дашбордов (моковые данные)
 * - ProfileButton: кнопка профиля (например, для выхода/настроек)
 * - useRouter: навигация от next/navigation
 */
import { mockDashboards } from "@/mocks/dashboards";
import ProfileButton from "./ProfileButton";
import { useRouter } from "next/navigation";

/**
 * Тип пропсов для NavMobile:
 * - onClose: функция закрытия меню
 * - selectedDashboardId: текущий выбранный дашборд
 * - onDashboardChange: колбэк при выборе нового дашборда
 */
type Props = {
  onClose: () => void;
  selectedDashboardId: string;
  onDashboardChange: (id: string) => void;
};

/**
 * Компонент NavMobile:
 * - отображает выпадающее меню для мобильных устройств
 * - содержит список дашбордов и кнопку "Создать задачу"
 * - скрывается на md и выше
 */
const NavMobile: React.FC<Props> = ({
  onClose,
  selectedDashboardId,
  onDashboardChange,
}) => {
  const router = useRouter();

  /**
   * Обработчик выбора дашборда:
   * - вызывает onDashboardChange
   * - закрывает мобильное меню
   * - перенаправляет на новый dashboardId через query-параметр
   */
  const handleDashboardSelect = (id: string) => {
    onDashboardChange(id);
    onClose();
    router.push(`/?dashboardId=${id}`);
  };

  return (
    /**
     * Основной контейнер:
     * - абсолютно позиционированное меню (под шапкой)
     * - скрыто на md и выше
     * - содержит список дашбордов и нижнюю панель действий
     */
    <div className="absolute top-16 left-0 w-full bg-white shadow-md z-10 flex flex-col items-start px-6 py-4 space-y-4 md:hidden">
      {/** Секция со списком дашбордов — разворачиваемая (details/summary) */}
      <details className="w-full" open>
        <summary className="cursor-pointer text-gray-700 text-3xl">
          Дашборды
        </summary>
        <div className="ml-4 mt-2 space-y-1">
          {mockDashboards.map((db) => (
            <button
              key={db.id}
              className={`block text-left text-2xl w-full ${
                db.id === selectedDashboardId
                  ? "text-blue-600 font-semibold"
                  : "text-gray-700"
              }`}
              onClick={() => handleDashboardSelect(db.id)}
            >
              {db.name}
            </button>
          ))}
        </div>
      </details>

      {/** Нижняя панель: кнопка создания задачи и кнопка профиля */}
      <div className="flex items-center justify-self-auto space-x-4 w-full">
        <button className="bg-indigo-900 text-white text-2xl text-center px-4 py-2 rounded-2xl transition">
          Создать задачу
        </button>
        <ProfileButton />
      </div>
    </div>
  );
};

/**
 * Экспорт NavMobile:
 * - используется в хедере на мобильных устройствах
 */
export default NavMobile;
