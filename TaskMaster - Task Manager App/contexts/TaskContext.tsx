import React, { createContext, useContext, useState, useEffect } from 'react';

export type Priority = 'low' | 'medium' | 'high';
export type TaskStatus = 'pending' | 'completed';

export interface Task {
  id: string;
  title: string;
  description?: string;
  dueDate?: string;
  priority: Priority;
  category: string;
  completed: boolean;
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
  status?: 'all' | 'completed' | 'pending';
  category?: string;
  priority?: Priority;
  search?: string;
}

interface TaskContextType {
  tasks: Task[];
  categories: string[];
  filters: TaskFilters;
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  addCategory: (name: string, color?: string) => void;
  setFilters: (filters: TaskFilters) => void;
  filteredTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<string[]>(['Work', 'Personal', 'Study']);
  const [filters, setFiltersState] = useState<TaskFilters>({ status: 'all' });

  // Load data on mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('taskmaster-tasks');
    const storedCategories = localStorage.getItem('taskmaster-categories');
    
    if (storedTasks) {
      const parsedTasks = JSON.parse(storedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
        updatedAt: new Date(task.updatedAt),
      }));
      setTasks(parsedTasks);
    }
    
    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    }
  }, []);

  // Save tasks when they change
  useEffect(() => {
    localStorage.setItem('taskmaster-tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Save categories when they change
  useEffect(() => {
    localStorage.setItem('taskmaster-categories', JSON.stringify(categories));
  }, [categories]);

  const addTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt' | 'completed'>) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date() }
        : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { 
            ...task, 
            completed: !task.completed,
            updatedAt: new Date()
          }
        : task
    ));
  };

  const addCategory = (name: string, color: string = '#6366f1') => {
    if (!categories.includes(name)) {
      setCategories(prev => [...prev, name]);
    }
  };

  const setFilters = (newFilters: TaskFilters) => {
    setFiltersState(newFilters);
  };

  // Filter tasks based on current filters
  const filteredTasks = tasks.filter(task => {
    if (filters.status && filters.status !== 'all') {
      const isCompleted = task.completed;
      if (filters.status === 'completed' && !isCompleted) return false;
      if (filters.status === 'pending' && isCompleted) return false;
    }
    if (filters.category && task.category !== filters.category) {
      return false;
    }
    if (filters.priority && task.priority !== filters.priority) {
      return false;
    }
    if (filters.search && !task.title.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <TaskContext.Provider value={{
      tasks,
      categories,
      filters,
      addTask,
      updateTask,
      deleteTask,
      toggleTaskStatus,
      addCategory,
      setFilters,
      filteredTasks,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}

// Keep the old export for backward compatibility
export const useTask = useTaskContext;