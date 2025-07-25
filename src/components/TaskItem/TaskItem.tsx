import React, { useState } from 'react';
import {
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiFlag,
  FiTag,
  FiBell,
  FiCheck,
  FiX,
  FiSave
} from 'react-icons/fi';
import { Task, Priority } from '../../types/Task';
import { useTask } from '../../context/TaskContext';
import { format, isToday, isTomorrow, isPast, parseISO } from 'date-fns';
import './TaskItem.css';

interface TaskItemProps {
  task: Task;
}

const TaskItem: React.FC<TaskItemProps> = ({ task }) => {
  const { updateTask, deleteTask, toggleTask, categories, addCategory } = useTask();
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description || '',
    dueDate: task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : '',
    dueTime: task.dueTime || '',
    priority: task.priority,
    category: task.category,
    reminderEnabled: task.reminderEnabled,
    reminderTime: task.reminderTime || ''
  });

  const handleSave = () => {
    if (!editForm.title.trim()) return;

    const updates: Partial<Task> = {
      title: editForm.title.trim(),
      description: editForm.description.trim() || undefined,
      dueDate: editForm.dueDate ? new Date(editForm.dueDate) : undefined,
      dueTime: editForm.dueTime || undefined,
      priority: editForm.priority,
      category: editForm.category,
      reminderEnabled: editForm.reminderEnabled,
      reminderTime: editForm.reminderTime || undefined
    };

    updateTask(task.id, updates);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({
      title: task.title,
      description: task.description || '',
      dueDate: task.dueDate ? format(task.dueDate, 'yyyy-MM-dd') : '',
      dueTime: task.dueTime || '',
      priority: task.priority,
      category: task.category,
      reminderEnabled: task.reminderEnabled,
      reminderTime: task.reminderTime || ''
    });
    setIsEditing(false);
  };

  const handleDelete = () => {
    deleteTask(task.id);
    setShowDeleteConfirm(false);
  };

  const formatDueDate = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'MMM d, yyyy');
  };

  const getDueDateStatus = () => {
    if (!task.dueDate) return null;
    
    if (isPast(task.dueDate) && !task.completed) {
      return 'overdue';
    }
    if (isToday(task.dueDate)) {
      return 'today';
    }
    if (isTomorrow(task.dueDate)) {
      return 'tomorrow';
    }
    return 'upcoming';
  };

  const getPriorityColor = (priority: Priority) => {
    switch (priority) {
      case 'High': return 'var(--danger-color)';
      case 'Medium': return 'var(--warning-color)';
      case 'Low': return 'var(--text-secondary)';
    }
  };

  if (isEditing) {
    return (
      <div className="task-item editing">
        <div className="task-edit-form">
          <div className="form-group">
            <input
              type="text"
              value={editForm.title}
              onChange={(e) => setEditForm(prev => ({ ...prev, title: e.target.value }))}
              className="input"
              placeholder="Task title"
              autoFocus
            />
          </div>
          
          <div className="form-group">
            <textarea
              value={editForm.description}
              onChange={(e) => setEditForm(prev => ({ ...prev, description: e.target.value }))}
              className="textarea"
              placeholder="Description (optional)"
              rows={2}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="label"><FiCalendar size={14} /> Due Date</label>
              <input
                type="date"
                value={editForm.dueDate}
                onChange={(e) => setEditForm(prev => ({ ...prev, dueDate: e.target.value }))}
                className="input"
              />
            </div>
            
            <div className="form-group">
              <label className="label"><FiClock size={14} /> Time</label>
              <input
                type="time"
                value={editForm.dueTime}
                onChange={(e) => setEditForm(prev => ({ ...prev, dueTime: e.target.value }))}
                className="input"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="label"><FiFlag size={14} /> Priority</label>
              <select
                value={editForm.priority}
                onChange={(e) => setEditForm(prev => ({ ...prev, priority: e.target.value as Priority }))}
                className="select"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
            
            <div className="form-group">
              <label className="label"><FiTag size={14} /> Category</label>
              <select
                value={editForm.category}
                onChange={(e) => setEditForm(prev => ({ ...prev, category: e.target.value }))}
                className="select"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id={`reminder-${task.id}`}
              checked={editForm.reminderEnabled}
              onChange={(e) => setEditForm(prev => ({ ...prev, reminderEnabled: e.target.checked }))}
              className="checkbox"
            />
            <label htmlFor={`reminder-${task.id}`} className="label">
              <FiBell size={14} /> Enable reminder
            </label>
            {editForm.reminderEnabled && (
              <input
                type="time"
                value={editForm.reminderTime}
                onChange={(e) => setEditForm(prev => ({ ...prev, reminderTime: e.target.value }))}
                className="input"
                style={{ marginLeft: 'auto', width: 'auto' }}
              />
            )}
          </div>

          <div className="task-edit-actions">
            <button onClick={handleCancel} className="btn btn-secondary btn-sm">
              <FiX size={16} /> Cancel
            </button>
            <button onClick={handleSave} className="btn btn-primary btn-sm">
              <FiSave size={16} /> Save
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showDeleteConfirm) {
    return (
      <div className="task-item delete-confirm">
        <div className="delete-confirm-content">
          <h4>Delete Task?</h4>
          <p>Are you sure you want to delete "{task.title}"? This action cannot be undone.</p>
          <div className="delete-confirm-actions">
            <button onClick={() => setShowDeleteConfirm(false)} className="btn btn-secondary btn-sm">
              Cancel
            </button>
            <button onClick={handleDelete} className="btn btn-danger btn-sm">
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }

  const dueDateStatus = getDueDateStatus();

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${dueDateStatus || ''}`}>
      <div className="task-checkbox">
        <button
          onClick={() => toggleTask(task.id)}
          className={`task-toggle ${task.completed ? 'checked' : ''}`}
          aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {task.completed && <FiCheck size={14} />}
        </button>
      </div>

      <div className="task-content">
        <div className="task-header">
          <h4 className="task-title">{task.title}</h4>
          <div className="task-badges">
            <span 
              className="priority-badge"
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            >
              {task.priority}
            </span>
            <span className="category-badge">{task.category}</span>
          </div>
        </div>

        {task.description && (
          <p className="task-description">{task.description}</p>
        )}

        <div className="task-meta">
          {task.dueDate && (
            <div className={`due-date ${dueDateStatus}`}>
              <FiCalendar size={14} />
              <span>{formatDueDate(task.dueDate)}</span>
              {task.dueTime && (
                <>
                  <FiClock size={14} />
                  <span>{task.dueTime}</span>
                </>
              )}
            </div>
          )}

          {task.reminderEnabled && task.reminderTime && (
            <div className="reminder">
              <FiBell size={14} />
              <span>{task.reminderTime}</span>
            </div>
          )}
        </div>

        {task.completed && task.completedAt && (
          <div className="completion-time">
            Completed {format(task.completedAt, 'MMM d, yyyy \'at\' h:mm a')}
          </div>
        )}
      </div>

      <div className="task-actions">
        <button
          onClick={() => setIsEditing(true)}
          className="btn btn-ghost btn-sm"
          aria-label="Edit task"
        >
          <FiEdit2 size={16} />
        </button>
        <button
          onClick={() => setShowDeleteConfirm(true)}
          className="btn btn-ghost btn-sm delete-btn"
          aria-label="Delete task"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default TaskItem;