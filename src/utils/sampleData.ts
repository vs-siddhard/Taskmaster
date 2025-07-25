import { Task, Priority } from '../types/Task';
import { addDays, addHours } from 'date-fns';

export const sampleTasks: Omit<Task, 'id' | 'createdAt' | 'completed'>[] = [
  {
    title: 'Complete quarterly report',
    description: 'Finalize Q4 financial analysis and prepare presentation for board meeting',
    dueDate: addDays(new Date(), 1),
    dueTime: '14:00',
    priority: 'High' as Priority,
    category: 'Work',
    reminderEnabled: true,
    reminderTime: '13:00'
  },
  {
    title: 'Buy groceries',
    description: 'Milk, bread, eggs, vegetables for the week',
    dueDate: new Date(),
    dueTime: '18:00',
    priority: 'Medium' as Priority,
    category: 'Personal',
    reminderEnabled: true,
    reminderTime: '17:30'
  },
  {
    title: 'Review React documentation',
    description: 'Study new React 18 features and concurrent rendering',
    dueDate: addDays(new Date(), 3),
    priority: 'Medium' as Priority,
    category: 'Study',
    reminderEnabled: false,
    reminderTime: undefined
  },
  {
    title: 'Morning workout',
    description: '30 minutes cardio and strength training',
    dueDate: new Date(),
    dueTime: '07:00',
    priority: 'Low' as Priority,
    category: 'Personal',
    reminderEnabled: true,
    reminderTime: '06:45'
  },
  {
    title: 'Team standup meeting',
    description: 'Daily scrum with development team',
    dueDate: new Date(),
    dueTime: '10:00',
    priority: 'High' as Priority,
    category: 'Work',
    reminderEnabled: true,
    reminderTime: '09:55'
  },
  {
    title: 'Read TypeScript handbook',
    description: 'Complete advanced types and decorators chapters',
    dueDate: addDays(new Date(), 7),
    priority: 'Low' as Priority,
    category: 'Study',
    reminderEnabled: false,
    reminderTime: undefined
  },
  {
    title: 'Call dentist appointment',
    description: 'Schedule routine cleaning for next month',
    priority: 'Medium' as Priority,
    category: 'Personal',
    reminderEnabled: false,
    reminderTime: undefined
  },
  {
    title: 'Code review for new feature',
    description: 'Review authentication system implementation by team member',
    dueDate: addDays(new Date(), -1), // Overdue task
    dueTime: '16:00',
    priority: 'High' as Priority,
    category: 'Work',
    reminderEnabled: true,
    reminderTime: '15:30'
  }
];

export const addSampleTasks = (addTask: (task: Omit<Task, 'id' | 'createdAt' | 'completed'>) => void) => {
  sampleTasks.forEach(task => addTask(task));
};