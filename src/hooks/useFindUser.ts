// tasker/src/hooks/useFindUser.ts
// Этот файл содержит хук для поиска пользователя по id в приложении Tasker
import { mockUsers } from "../mocks/users";

/**
 * Функция поиска пользователя по id, возвращает имя или дефолт
 */
export const findUser = (id: string): string =>
  mockUsers.find((u) => u.id === id)?.name || "—";
