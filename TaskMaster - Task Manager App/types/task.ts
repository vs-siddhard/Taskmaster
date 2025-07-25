export type Priority = 'Low' | 'Medium' | 'High';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  priority: Priority;
  category: string;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  color: string;
  isDefault: boolean;
}

export interface TaskFilters {
  status?: TaskStatus | 'all';
  category?: string;
  priority?: Priority;
  search?: string;
}