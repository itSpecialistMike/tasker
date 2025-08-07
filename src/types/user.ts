// src/types/user.ts
// этот файл содержит типы для пользователей в приложении Tasker

export interface User {
  id: number;
  name: string;
  surname: string;
  middlename: string;
  login: string;
  roleID: number;
}
