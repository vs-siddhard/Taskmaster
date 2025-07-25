import React, { useState } from 'react';
import { 
  FiSearch, 
  FiFilter, 
  FiX, 
  FiCheckCircle, 
  FiClock, 
  FiList,
  FiTrash2
} from 'react-icons/fi';
import { useTask } from '../../context/TaskContext';
import { Priority } from '../../types/Task';
import './FilterBar.css';

const FilterBar: React.FC = () => {
  const { filter, setFilter, categories, clearCompleted, getTaskStats } = useTask();
  const [showFilters, setShowFilters] = useState(false);
  const stats = getTaskStats();

  const handleSearchChange = (query: string) => {
    setFilter({ ...filter, searchQuery: query || undefined });
  };

  const handleCategoryFilter = (category: string) => {
    setFilter({ 
      ...filter, 
      category: filter.category === category ? undefined : category 
    });
  };

  const handlePriorityFilter = (priority: Priority) => {
    setFilter({ 
      ...filter, 
      priority: filter.priority === priority ? undefined : priority 
    });
  };

  const handleStatusFilter = (completed: boolean) => {
    setFilter({ 
      ...filter, 
      completed: filter.completed === completed ? undefined : completed 
    });
  };

  const clearAllFilters = () => {
    setFilter({});
  };

  const hasActiveFilters = filter.category || filter.priority || filter.completed !== undefined || filter.searchQuery;

  return (
    <div className="filter-bar card fade-in">
      <div className="filter-header">
        <div className="search-container">
          <FiSearch className="search-icon" size={18} />
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.searchQuery || ''}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="search-input"
          />
          {filter.searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="clear-search-btn"
              aria-label="Clear search"
            >
              <FiX size={16} />
            </button>
          )}
        </div>
        
        <div className="filter-actions">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn btn-ghost filter-toggle ${showFilters ? 'active' : ''}`}
            aria-label="Toggle filters"
          >
            <FiFilter size={18} />
            {hasActiveFilters && <span className="filter-badge" />}
          </button>
          
          {stats.completed > 0 && (
            <button
              onClick={clearCompleted}
              className="btn btn-ghost clear-completed-btn"
              title="Clear completed tasks"
            >
              <FiTrash2 size={16} />
              <span className="text-sm">Clear completed</span>
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <div className="filters-expanded">
          <div className="filter-section">
            <h4 className="filter-title">Status</h4>
            <div className="filter-buttons">
              <button
                onClick={() => handleStatusFilter(false)}
                className={`filter-btn ${filter.completed === false ? 'active' : ''}`}
              >
                <FiClock size={16} />
                Pending ({stats.pending})
              </button>
              <button
                onClick={() => handleStatusFilter(true)}
                className={`filter-btn ${filter.completed === true ? 'active' : ''}`}
              >
                <FiCheckCircle size={16} />
                Completed ({stats.completed})
              </button>
              <button
                onClick={() => setFilter({ ...filter, completed: undefined })}
                className={`filter-btn ${filter.completed === undefined ? 'active' : ''}`}
              >
                <FiList size={16} />
                All ({stats.total})
              </button>
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Priority</h4>
            <div className="filter-buttons">
              {(['High', 'Medium', 'Low'] as Priority[]).map(priority => (
                <button
                  key={priority}
                  onClick={() => handlePriorityFilter(priority)}
                  className={`filter-btn priority-${priority.toLowerCase()} ${
                    filter.priority === priority ? 'active' : ''
                  }`}
                >
                  {priority}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-section">
            <h4 className="filter-title">Category</h4>
            <div className="filter-buttons">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => handleCategoryFilter(category)}
                  className={`filter-btn ${filter.category === category ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {hasActiveFilters && (
            <div className="filter-actions-bottom">
              <button
                onClick={clearAllFilters}
                className="btn btn-secondary btn-sm"
              >
                <FiX size={16} />
                Clear all filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;