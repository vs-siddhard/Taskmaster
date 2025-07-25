import { Task, Category } from '../types/task';

const TASKS_KEY = 'taskmaster_tasks';
const CATEGORIES_KEY = 'taskmaster_categories';
const SETTINGS_KEY = 'taskmaster_settings';

export interface AppSettings {
  darkMode: boolean;
  userId?: string;
}

export const storage = {
  // Tasks
  getTasks(): Task[] {
    try {
      const tasks = localStorage.getItem(TASKS_KEY);
      if (!tasks) return [];
      return JSON.parse(tasks).map((task: any) => ({
        ...task,
        dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
    } catch {
      return [];
    }
  },

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  },

  // Categories
  getCategories(): Category[] {
    try {
      const categories = localStorage.getItem(CATEGORIES_KEY);
      if (!categories) return getDefaultCategories();
      return JSON.parse(categories);
    } catch {
      return getDefaultCategories();
    }
  },

  saveCategories(categories: Category[]): void {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },

  // Settings
  getSettings(): AppSettings {
    try {
      const settings = localStorage.getItem(SETTINGS_KEY);
      if (!settings) return { darkMode: false };
      return JSON.parse(settings);
    } catch {
      return { darkMode: false };
    }
  },

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  },
};

export function getDefaultCategories(): Category[] {
  return [
    { id: 'work', name: 'Work', color: '#3b82f6', isDefault: true },
    { id: 'personal', name: 'Personal', color: '#10b981', isDefault: true },
    { id: 'study', name: 'Study', color: '#f59e0b', isDefault: true },
  ];
}