export type Priority = 'Low' | 'Medium' | 'High';
export type Category = 'Work' | 'Personal' | 'Study' | string;

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  dueTime?: string;
  priority: Priority;
  category: Category;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
  reminderEnabled: boolean;
  reminderTime?: string;
}

export interface TaskFilter {
  category?: string;
  priority?: Priority;
  completed?: boolean;
  searchQuery?: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  isGuest: boolean;
}