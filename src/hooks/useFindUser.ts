import { mockUsers } from "../mocks/users";

/**
 * Функция поиска пользователя по id, возвращает имя или дефолт
 */
export const findUser = (id: string): string =>
  mockUsers.find((u) => u.id === id)?.name || "—";
