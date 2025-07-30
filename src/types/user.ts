// src/types/user.ts
// этот файл содержит типы для пользователей в приложении Tasker

export interface User {
  id: string;
  name: string;
  email?: string;
  avatarUrl?: string;
}
