import React from 'react';
import { TaskProvider } from './context/TaskContext';
import Header from './components/Header/Header';
import TaskList from './components/TaskList/TaskList';
import TaskForm from './components/TaskForm/TaskForm';
import FilterBar from './components/FilterBar/FilterBar';
import TaskStats from './components/TaskStats/TaskStats';
import Footer from './components/Footer/Footer';
import { useTask } from './context/TaskContext';
import './App.css';

function AppContent() {
  const { darkMode } = useTask();

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <div className="content-wrapper">
            <TaskStats />
            <TaskForm />
            <FilterBar />
            <TaskList />
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}

function App() {
  return (
    <TaskProvider>
      <AppContent />
    </TaskProvider>
  );
}

export default App;