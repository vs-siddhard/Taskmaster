import React, { useState } from 'react';
import { Button } from './ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Settings, Moon, Sun, User, Plus } from 'lucide-react';
import { useTaskContext } from '../contexts/TaskContext';
import { CreateCategoryDialog } from './CreateCategoryDialog';

export function Header() {
  const { tasks } = useTaskContext();
  const [showCreateCategory, setShowCreateCategory] = useState(false);

  const pendingCount = tasks.filter(task => !task.completed).length;
  const completedCount = tasks.filter(task => task.completed).length;

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div>
          <p className="text-sm text-muted-foreground">
            {pendingCount} pending • {completedCount} completed
          </p>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => setShowCreateCategory(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="w-4 h-4 mr-2" />
              Account (Guest)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {showCreateCategory && (
        <CreateCategoryDialog 
          open={showCreateCategory} 
          onClose={() => setShowCreateCategory(false)} 
        />
      )}
    </>
  );
}