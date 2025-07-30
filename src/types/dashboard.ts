// src/types/dashboard.ts
// этот файл содержит типы для дашбордов в приложении Tasker

export interface Dashboard {
  id: string;
  title: string;
  description?: string;
  ownerId: string;
  createdAt: string;
}
