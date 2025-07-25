import React, { useState } from 'react';
import { FiPlus, FiCalendar, FiClock, FiFlag, FiTag, FiBell } from 'react-icons/fi';
import { useTask } from '../../context/TaskContext';
import { Priority, Category } from '../../types/Task';
import { format } from 'date-fns';
import './TaskForm.css';

const TaskForm: React.FC = () => {
  const { addTask, categories, addCategory } = useTask();
  
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    dueTime: '',
    priority: 'Medium' as Priority,
    category: 'Personal' as Category,
    reminderEnabled: false,
    reminderTime: ''
  });
  const [newCategory, setNewCategory] = useState('');
  const [showNewCategory, setShowNewCategory] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    const task = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
      dueTime: formData.dueTime || undefined,
      priority: formData.priority,
      category: formData.category,
      reminderEnabled: formData.reminderEnabled,
      reminderTime: formData.reminderTime || undefined
    };

    addTask(task);
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      dueDate: '',
      dueTime: '',
      priority: 'Medium',
      category: 'Personal',
      reminderEnabled: false,
      reminderTime: ''
    });
    setIsExpanded(false);
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      addCategory(newCategory.trim());
      setFormData(prev => ({ ...prev, category: newCategory.trim() }));
      setNewCategory('');
      setShowNewCategory(false);
    }
  };

  const getTodayDate = () => {
    return format(new Date(), 'yyyy-MM-dd');
  };

  return (
    <div className="task-form card slide-up">
      <form onSubmit={handleSubmit}>
        <div className="form-header">
          <div className="form-group">
            <input
              type="text"
              placeholder="Add a new task..."
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              onFocus={() => setIsExpanded(true)}
              className="input task-title-input"
              required
            />
          </div>
          
          {!isExpanded && (
            <button
              type="button"
              onClick={() => setIsExpanded(true)}
              className="btn btn-primary btn-sm expand-btn"
            >
              <FiPlus size={16} />
            </button>
          )}
        </div>

        {isExpanded && (
          <div className="form-expanded">
            <div className="form-group">
              <label className="label">
                <FiTag size={16} />
                Description (optional)
              </label>
              <textarea
                placeholder="Add more details about this task..."
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                className="textarea"
                rows={2}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="label">
                  <FiCalendar size={16} />
                  Due Date
                </label>
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                  min={getTodayDate()}
                  className="input"
                />
              </div>
              
              <div className="form-group">
                <label className="label">
                  <FiClock size={16} />
                  Due Time
                </label>
                <input
                  type="time"
                  value={formData.dueTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, dueTime: e.target.value }))}
                  className="input"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="label">
                  <FiFlag size={16} />
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData(prev => ({ ...prev, priority: e.target.value as Priority }))}
                  className="select"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              
              <div className="form-group">
                <label className="label">
                  <FiTag size={16} />
                  Category
                </label>
                <div className="category-input">
                  <select
                    value={formData.category}
                    onChange={(e) => {
                      if (e.target.value === '__new__') {
                        setShowNewCategory(true);
                      } else {
                        setFormData(prev => ({ ...prev, category: e.target.value }));
                      }
                    }}
                    className="select"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                    <option value="__new__">+ Add new category</option>
                  </select>
                </div>
              </div>
            </div>

            {showNewCategory && (
              <div className="form-group">
                <label className="label">New Category</label>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Enter category name"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="input"
                    onKeyPress={(e) => e.key === 'Enter' && handleAddCategory()}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="btn btn-secondary btn-sm"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewCategory(false);
                      setNewCategory('');
                    }}
                    className="btn btn-ghost btn-sm"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="form-group">
              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="reminder"
                  checked={formData.reminderEnabled}
                  onChange={(e) => setFormData(prev => ({ ...prev, reminderEnabled: e.target.checked }))}
                  className="checkbox"
                />
                <label htmlFor="reminder" className="label">
                  <FiBell size={16} />
                  Enable reminder
                </label>
              </div>
              
              {formData.reminderEnabled && (
                <input
                  type="time"
                  value={formData.reminderTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, reminderTime: e.target.value }))}
                  className="input mt-2"
                  placeholder="Reminder time"
                />
              )}
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setShowNewCategory(false);
                  setNewCategory('');
                }}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!formData.title.trim()}
              >
                <FiPlus size={16} />
                Add Task
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TaskForm;