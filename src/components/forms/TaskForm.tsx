// src/components/TaskForm.tsx

import React, { useState } from 'react';
import { TaskStatus, ApproveStatus } from '@/types/task';

interface Props {
  onSubmit: (data: Omit<TaskFormData, 'id' | 'createdAt' | 'completedAt'>) => void;
}

export interface TaskFormData {
  title: string;
  description: string;
  status: TaskStatus;
  deadline: string;
  assignerId?: string;
  reporterId: string;
  reviewerId?: string;
  approverId: string;
  approveStatus: ApproveStatus;
  dashboardId: string;
  blockedBy: string[];
}

const TaskForm: React.FC<Props> = ({ onSubmit }) => {
  const [form, setForm] = useState<TaskFormData>({
    title: '',
    description: '',
    status: 'to-do',
    deadline: '',
    assignerId: '',
    reporterId: '',
    reviewerId: '',
    approverId: '',
    approveStatus: 'need-approval',
    dashboardId: '',
    blockedBy: [],
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlockedByChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ids = e.target.value.split(',').map((s) => s.trim());
    setForm((prev) => ({ ...prev, blockedBy: ids }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Можно добавить валидацию здесь
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 max-w-md">
      <input name="title" value={form.title} onChange={handleChange} placeholder="Название" required className="input" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Описание" className="input" />
      <input name="deadline" type="datetime-local" value={form.deadline} onChange={handleChange} required className="input" />
      <input name="dashboardId" value={form.dashboardId} onChange={handleChange} placeholder="Dashboard ID" required className="input" />
      <input name="reporterId" value={form.reporterId} onChange={handleChange} placeholder="Reporter ID" required className="input" />
      <input name="approverId" value={form.approverId} onChange={handleChange} placeholder="Approver ID" required className="input" />
      <input name="assignerId" value={form.assignerId} onChange={handleChange} placeholder="Assigner ID (необязательно)" className="input" />
      <input name="reviewerId" value={form.reviewerId} onChange={handleChange} placeholder="Reviewer ID (необязательно)" className="input" />
      <input name="blockedBy" onChange={handleBlockedByChange} placeholder="Заблокирована задачами (через запятую)" className="input" />

      <select name="status" value={form.status} onChange={handleChange} className="input">
        <option value="to-do">To Do</option>
        <option value="in-progress">In Progress</option>
        <option value="review">Review</option>
        <option value="blocked">Blocked</option>
        <option value="done">Done</option>
        <option value="canceled">Canceled</option>
      </select>

      <select name="approveStatus" value={form.approveStatus} onChange={handleChange} className="input">
        <option value="need-approval">Need Approval</option>
        <option value="approval">Approval</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>

      <button type="submit" className="btn btn-primary">Создать задачу</button>
    </form>
  );
};

export default TaskForm;
