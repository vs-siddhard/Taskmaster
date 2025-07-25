import React, { useState } from 'react';
import { Calendar, CheckSquare, Target, Moon, Sun } from 'lucide-react';
import { TaskProvider } from './contexts/TaskContext';
import { TaskList } from './components/TaskList';
import { Header } from './components/Header';
import { CalendarPage } from './components/CalendarPage';
import { HabitsPage } from './components/HabitsPage';
import { Button } from './components/ui/button';
import { Separator } from './components/ui/separator';

type Page = 'tasks' | 'calendar' | 'habits';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('tasks');
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'tasks':
        return <TaskList />;
      case 'calendar':
        return <CalendarPage />;
      case 'habits':
        return <HabitsPage />;
      default:
        return <TaskList />;
    }
  };

  return (
    <TaskProvider>
      <div className={`min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300`}>
        <div className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <CheckSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  TaskMaster
                </h1>
                <p className="text-sm text-muted-foreground">Your comprehensive task management solution</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-2 mb-8 p-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <Button
              variant={currentPage === 'tasks' ? 'default' : 'ghost'}
              className={`flex items-center gap-2 rounded-lg transition-all duration-200 ${
                currentPage === 'tasks' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setCurrentPage('tasks')}
            >
              <CheckSquare className="w-4 h-4" />
              Tasks
            </Button>
            <Button
              variant={currentPage === 'calendar' ? 'default' : 'ghost'}
              className={`flex items-center gap-2 rounded-lg transition-all duration-200 ${
                currentPage === 'calendar' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setCurrentPage('calendar')}
            >
              <Calendar className="w-4 h-4" />
              Calendar
            </Button>
            <Button
              variant={currentPage === 'habits' ? 'default' : 'ghost'}
              className={`flex items-center gap-2 rounded-lg transition-all duration-200 ${
                currentPage === 'habits' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
              onClick={() => setCurrentPage('habits')}
            >
              <Target className="w-4 h-4" />
              Habits
            </Button>
          </div>

          {/* Page Content */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
            {currentPage === 'tasks' && <Header />}
            {renderPage()}
          </div>
        </div>
      </div>
    </TaskProvider>
  );
}