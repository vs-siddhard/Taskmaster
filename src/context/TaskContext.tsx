import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Task, TaskFilter, Priority, Category } from '../types/Task';
import { v4 as uuidv4 } from 'uuid';

interface TaskState {
  tasks: Task[];
  filter: TaskFilter;
  darkMode: boolean;
  categories: string[];
}

type TaskAction =
  | { type: 'ADD_TASK'; payload: Omit<Task, 'id' | 'createdAt' | 'completed'> }
  | { type: 'UPDATE_TASK'; payload: { id: string; updates: Partial<Task> } }
  | { type: 'DELETE_TASK'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'SET_FILTER'; payload: TaskFilter }
  | { type: 'TOGGLE_DARK_MODE' }
  | { type: 'ADD_CATEGORY'; payload: string }
  | { type: 'LOAD_TASKS'; payload: Task[] }
  | { type: 'CLEAR_COMPLETED' };

interface TaskContextType extends TaskState {
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  toggleDarkMode: () => void;
  addCategory: (category: string) => void;
  clearCompleted: () => void;
  getFilteredTasks: () => Task[];
  getTaskStats: () => { total: number; completed: number; pending: number };
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const initialState: TaskState = {
  tasks: [],
  filter: {},
  darkMode: false,
  categories: ['Work', 'Personal', 'Study']
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
  switch (action.type) {
    case 'ADD_TASK':
      const newTask: Task = {
        ...action.payload,
        id: uuidv4(),
        createdAt: new Date(),
        completed: false
      };
      return {
        ...state,
        tasks: [...state.tasks, newTask]
      };

    case 'UPDATE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.id
            ? { ...task, ...action.payload.updates }
            : task
        )
      };

    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };

    case 'TOGGLE_TASK':
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload
            ? { 
                ...task, 
                completed: !task.completed,
                completedAt: !task.completed ? new Date() : undefined
              }
            : task
        )
      };

    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload
      };

    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode
      };

    case 'ADD_CATEGORY':
      if (!state.categories.includes(action.payload)) {
        return {
          ...state,
          categories: [...state.categories, action.payload]
        };
      }
      return state;

    case 'LOAD_TASKS':
      return {
        ...state,
        tasks: action.payload
      };

    case 'CLEAR_COMPLETED':
      return {
        ...state,
        tasks: state.tasks.filter(task => !task.completed)
      };

    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('taskmaster-tasks');
    const savedSettings = localStorage.getItem('taskmaster-settings');
    
    if (savedTasks) {
      try {
        const tasks = JSON.parse(savedTasks).map((task: any) => ({
          ...task,
          createdAt: new Date(task.createdAt),
          dueDate: task.dueDate ? new Date(task.dueDate) : undefined,
          completedAt: task.completedAt ? new Date(task.completedAt) : undefined
        }));
        dispatch({ type: 'LOAD_TASKS', payload: tasks });
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    }

    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        if (settings.darkMode) {
          dispatch({ type: 'TOGGLE_DARK_MODE' });
        }
        if (settings.categories) {
          settings.categories.forEach((category: string) => {
            dispatch({ type: 'ADD_CATEGORY', payload: category });
          });
        }
      } catch (error) {
        console.error('Failed to load settings:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    localStorage.setItem('taskmaster-tasks', JSON.stringify(state.tasks));
  }, [state.tasks]);

  // Save settings to localStorage whenever settings change
  useEffect(() => {
    localStorage.setItem('taskmaster-settings', JSON.stringify({
      darkMode: state.darkMode,
      categories: state.categories
    }));
  }, [state.darkMode, state.categories]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => {
    dispatch({ type: 'ADD_TASK', payload: task });
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    dispatch({ type: 'UPDATE_TASK', payload: { id, updates } });
  };

  const deleteTask = (id: string) => {
    dispatch({ type: 'DELETE_TASK', payload: id });
  };

  const toggleTask = (id: string) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  const setFilter = (filter: TaskFilter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  const toggleDarkMode = () => {
    dispatch({ type: 'TOGGLE_DARK_MODE' });
  };

  const addCategory = (category: string) => {
    dispatch({ type: 'ADD_CATEGORY', payload: category });
  };

  const clearCompleted = () => {
    dispatch({ type: 'CLEAR_COMPLETED' });
  };

  const getFilteredTasks = (): Task[] => {
    let filtered = [...state.tasks];

    if (state.filter.category) {
      filtered = filtered.filter(task => task.category === state.filter.category);
    }

    if (state.filter.priority) {
      filtered = filtered.filter(task => task.priority === state.filter.priority);
    }

    if (state.filter.completed !== undefined) {
      filtered = filtered.filter(task => task.completed === state.filter.completed);
    }

    if (state.filter.searchQuery) {
      const query = state.filter.searchQuery.toLowerCase();
      filtered = filtered.filter(task =>
        task.title.toLowerCase().includes(query) ||
        (task.description && task.description.toLowerCase().includes(query))
      );
    }

    // Sort by priority and due date
    return filtered.sort((a, b) => {
      // Completed tasks go to bottom
      if (a.completed !== b.completed) {
        return a.completed ? 1 : -1;
      }

      // Sort by priority
      const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Sort by due date
      if (a.dueDate && b.dueDate) {
        return a.dueDate.getTime() - b.dueDate.getTime();
      }
      if (a.dueDate) return -1;
      if (b.dueDate) return 1;

      // Sort by creation date
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  };

  const getTaskStats = () => {
    const total = state.tasks.length;
    const completed = state.tasks.filter(task => task.completed).length;
    const pending = total - completed;
    return { total, completed, pending };
  };

  const value: TaskContextType = {
    ...state,
    addTask,
    updateTask,
    deleteTask,
    toggleTask,
    setFilter,
    toggleDarkMode,
    addCategory,
    clearCompleted,
    getFilteredTasks,
    getTaskStats
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTask() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
}