import React from 'react';
import { FiMoon, FiSun, FiCheckSquare, FiDatabase } from 'react-icons/fi';
import { useTask } from '../../context/TaskContext';
import { addSampleTasks } from '../../utils/sampleData';
import './Header.css';

const Header: React.FC = () => {
  const { darkMode, toggleDarkMode, addTask, getTaskStats } = useTask();
  const stats = getTaskStats();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <FiCheckSquare className="logo-icon" />
          <h1 className="logo-text">TaskMaster</h1>
        </div>
        
        <div className="header-actions">
          {stats.total === 0 && (
            <button
              onClick={() => addSampleTasks(addTask)}
              className="btn btn-secondary btn-sm"
              title="Load sample tasks to explore the app"
            >
              <FiDatabase size={16} />
              Load Sample Data
            </button>
          )}
          <button
            onClick={toggleDarkMode}
            className="btn btn-ghost theme-toggle"
            aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;