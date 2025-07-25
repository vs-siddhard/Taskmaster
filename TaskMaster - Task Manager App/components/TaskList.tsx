import React from 'react';
import { TaskItem } from './TaskItem';
import { TaskFilters } from './TaskFilters';
import { CreateTaskDialog } from './CreateTaskDialog';
import { useTaskContext } from '../contexts/TaskContext';
import { AlertCircle, CheckCircle, ListTodo } from 'lucide-react';

export function TaskList() {
  const { filteredTasks, filters } = useTaskContext();

  return (
    <div className="space-y-6">
      <TaskFilters />
      <CreateTaskDialog />
      
      {filteredTasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 text-muted-foreground">
            {filters.status === 'completed' ? (
              <CheckCircle className="w-full h-full" />
            ) : filters.status === 'pending' ? (
              <AlertCircle className="w-full h-full" />
            ) : (
              <ListTodo className="w-full h-full" />
            )}
          </div>
          <h3 className="mb-2">No tasks found</h3>
          <p className="text-muted-foreground text-sm">
            {filters.search ? (
              `No tasks match "${filters.search}"`
            ) : filters.status === 'completed' ? (
              'No completed tasks yet'
            ) : filters.status === 'pending' ? (
              'No pending tasks'
            ) : (
              'Create your first task to get started'
            )}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredTasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}