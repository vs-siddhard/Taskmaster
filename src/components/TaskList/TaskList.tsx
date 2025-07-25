import React from 'react';
import { FiInbox, FiSearch } from 'react-icons/fi';
import { useTask } from '../../context/TaskContext';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

const TaskList: React.FC = () => {
  const { getFilteredTasks, filter } = useTask();
  const tasks = getFilteredTasks();

  const getEmptyStateMessage = () => {
    if (filter.searchQuery) {
      return {
        icon: <FiSearch size={48} />,
        title: 'No tasks found',
        message: `No tasks match "${filter.searchQuery}". Try adjusting your search or filters.`
      };
    }
    
    if (filter.completed === true) {
      return {
        icon: <FiInbox size={48} />,
        title: 'No completed tasks',
        message: 'Complete some tasks to see them here.'
      };
    }
    
    if (filter.completed === false) {
      return {
        icon: <FiInbox size={48} />,
        title: 'All caught up!',
        message: 'You have no pending tasks. Great job!'
      };
    }
    
    if (filter.category || filter.priority) {
      return {
        icon: <FiInbox size={48} />,
        title: 'No tasks found',
        message: 'No tasks match your current filters. Try adjusting them or create a new task.'
      };
    }
    
    return {
      icon: <FiInbox size={48} />,
      title: 'No tasks yet',
      message: 'Start by creating your first task above.'
    };
  };

  if (tasks.length === 0) {
    const emptyState = getEmptyStateMessage();
    
    return (
      <div className="task-list card fade-in">
        <div className="empty-state">
          <div className="empty-icon">{emptyState.icon}</div>
          <h3 className="empty-title">{emptyState.title}</h3>
          <p className="empty-message">{emptyState.message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="task-list card fade-in">
      <div className="task-list-header">
        <h3 className="task-list-title">
          {filter.completed === true && 'Completed Tasks'}
          {filter.completed === false && 'Pending Tasks'}
          {filter.completed === undefined && 'All Tasks'}
          {filter.category && ` - ${filter.category}`}
          {filter.priority && ` - ${filter.priority} Priority`}
          <span className="task-count">({tasks.length})</span>
        </h3>
      </div>
      
      <div className="task-items">
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;