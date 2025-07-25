import React from 'react';
import { FiCheckCircle, FiClock, FiList } from 'react-icons/fi';
import { useTask } from '../../context/TaskContext';
import './TaskStats.css';

const TaskStats: React.FC = () => {
  const { getTaskStats } = useTask();
  const stats = getTaskStats();

  const completionRate = stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0;

  return (
    <div className="task-stats card fade-in">
      <div className="stats-header">
        <h2 className="stats-title">Task Overview</h2>
        <div className="completion-rate">
          <span className="completion-text">{completionRate}% Complete</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${completionRate}%` }}
            />
          </div>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-icon total">
            <FiList size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.total}</span>
            <span className="stat-label">Total Tasks</span>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon completed">
            <FiCheckCircle size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.completed}</span>
            <span className="stat-label">Completed</span>
          </div>
        </div>
        
        <div className="stat-item">
          <div className="stat-icon pending">
            <FiClock size={20} />
          </div>
          <div className="stat-content">
            <span className="stat-number">{stats.pending}</span>
            <span className="stat-label">Pending</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskStats;