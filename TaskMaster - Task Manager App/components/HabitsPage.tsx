import React, { useState, useEffect } from 'react';
import { Target, Star, Clock, CheckCircle, Plus, Flame, Trophy, Calendar } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface Habit {
  id: string;
  title: string;
  description: string;
  category: string;
  frequency: 'daily' | 'weekly';
  streak: number;
  completed: boolean;
  completedDates: string[];
  icon: string;
  color: string;
}

const suggestedHabits = [
  {
    id: 'morning-routine',
    title: 'Morning Routine',
    description: 'Start your day with a consistent morning routine',
    category: 'Productivity',
    frequency: 'daily' as const,
    icon: '🌅',
    color: 'bg-orange-500'
  },
  {
    id: 'exercise',
    title: 'Daily Exercise',
    description: '30 minutes of physical activity',
    category: 'Health',
    frequency: 'daily' as const,
    icon: '💪',
    color: 'bg-green-500'
  },
  {
    id: 'reading',
    title: 'Read for 30 minutes',
    description: 'Read books, articles, or learning materials',
    category: 'Learning',
    frequency: 'daily' as const,
    icon: '📚',
    color: 'bg-blue-500'
  },
  {
    id: 'meditation',
    title: 'Meditation',
    description: '10 minutes of mindfulness or meditation',
    category: 'Wellness',
    frequency: 'daily' as const,
    icon: '🧘',
    color: 'bg-purple-500'
  },
  {
    id: 'water-intake',
    title: 'Drink 8 glasses of water',
    description: 'Stay hydrated throughout the day',
    category: 'Health',
    frequency: 'daily' as const,
    icon: '💧',
    color: 'bg-cyan-500'
  },
  {
    id: 'gratitude',
    title: 'Gratitude Journal',
    description: 'Write down 3 things you\'re grateful for',
    category: 'Wellness',
    frequency: 'daily' as const,
    icon: '🙏',
    color: 'bg-pink-500'
  },
  {
    id: 'skill-practice',
    title: 'Practice a Skill',
    description: 'Dedicate time to learning or practicing a skill',
    category: 'Learning',
    frequency: 'daily' as const,
    icon: '🎯',
    color: 'bg-indigo-500'
  },
  {
    id: 'planning',
    title: 'Plan Tomorrow',
    description: 'Review and plan tasks for the next day',
    category: 'Productivity',
    frequency: 'daily' as const,
    icon: '📅',
    color: 'bg-gray-500'
  }
];

export function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [newHabit, setNewHabit] = useState({
    title: '',
    description: '',
    category: 'Productivity',
    frequency: 'daily' as const
  });

  useEffect(() => {
    const storedHabits = localStorage.getItem('taskmaster-habits');
    if (storedHabits) {
      setHabits(JSON.parse(storedHabits));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskmaster-habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = (suggested?: typeof suggestedHabits[0]) => {
    const habitData = suggested || newHabit;
    const habit: Habit = {
      id: Date.now().toString(),
      title: habitData.title,
      description: habitData.description,
      category: habitData.category,
      frequency: habitData.frequency,
      streak: 0,
      completed: false,
      completedDates: [],
      icon: suggested?.icon || '🎯',
      color: suggested?.color || 'bg-gray-500'
    };
    
    setHabits([...habits, habit]);
    setShowCreateDialog(false);
    setNewHabit({ title: '', description: '', category: 'Productivity', frequency: 'daily' });
  };

  const toggleHabit = (id: string) => {
    const today = new Date().toISOString().split('T')[0];
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const alreadyCompleted = habit.completedDates.includes(today);
        const newCompletedDates = alreadyCompleted
          ? habit.completedDates.filter(date => date !== today)
          : [...habit.completedDates, today];
        
        return {
          ...habit,
          completed: !alreadyCompleted,
          completedDates: newCompletedDates,
          streak: alreadyCompleted ? Math.max(0, habit.streak - 1) : habit.streak + 1
        };
      }
      return habit;
    }));
  };

  const getCompletionRate = (habit: Habit) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    });
    
    const completedInLast7Days = last7Days.filter(date => habit.completedDates.includes(date)).length;
    return (completedInLast7Days / 7) * 100;
  };

  const totalHabits = habits.length;
  const completedToday = habits.filter(habit => {
    const today = new Date().toISOString().split('T')[0];
    return habit.completedDates.includes(today);
  }).length;

  const averageStreak = habits.length > 0 ? Math.round(habits.reduce((sum, habit) => sum + habit.streak, 0) / habits.length) : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Target className="w-6 h-6 text-purple-600" />
          <h2 className="text-2xl font-bold">Habit Tracker</h2>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Habit
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Habit</DialogTitle>
              <DialogDescription>Add a new habit to track your progress</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={newHabit.title}
                  onChange={(e) => setNewHabit({ ...newHabit, title: e.target.value })}
                  placeholder="Enter habit title"
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newHabit.description}
                  onChange={(e) => setNewHabit({ ...newHabit, description: e.target.value })}
                  placeholder="Enter habit description"
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newHabit.category} onValueChange={(value) => setNewHabit({ ...newHabit, category: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Productivity">Productivity</SelectItem>
                    <SelectItem value="Health">Health</SelectItem>
                    <SelectItem value="Learning">Learning</SelectItem>
                    <SelectItem value="Wellness">Wellness</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={newHabit.frequency} onValueChange={(value: 'daily' | 'weekly') => setNewHabit({ ...newHabit, frequency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={() => addHabit()} className="w-full">
                Create Habit
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Progress</CardTitle>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completedToday}/{totalHabits}</div>
            <p className="text-xs text-muted-foreground">
              {totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0}% completed
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Streak</CardTitle>
            <Flame className="w-4 h-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageStreak}</div>
            <p className="text-xs text-muted-foreground">
              days average
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Habits</CardTitle>
            <Trophy className="w-4 h-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHabits}</div>
            <p className="text-xs text-muted-foreground">
              habits tracked
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="my-habits" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="my-habits">My Habits</TabsTrigger>
          <TabsTrigger value="suggested">Suggested Habits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="my-habits" className="space-y-4">
          {habits.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Target className="w-12 h-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold mb-2">No habits yet</h3>
                <p className="text-muted-foreground text-center mb-4">
                  Start building good habits by adding your first habit or choosing from our suggestions.
                </p>
                <Button onClick={() => setShowCreateDialog(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Your First Habit
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {habits.map(habit => (
                <Card key={habit.id} className={`transition-all duration-200 ${habit.completed ? 'ring-2 ring-green-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${habit.color}`}>
                          {habit.icon}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{habit.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{habit.category}</Badge>
                            <Badge variant="secondary">{habit.frequency}</Badge>
                            <div className="flex items-center gap-1 text-sm">
                              <Flame className="w-3 h-3 text-orange-500" />
                              <span>{habit.streak} day streak</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span>Weekly completion</span>
                              <span>{Math.round(getCompletionRate(habit))}%</span>
                            </div>
                            <Progress value={getCompletionRate(habit)} className="h-2" />
                          </div>
                        </div>
                      </div>
                      <Button
                        variant={habit.completed ? "default" : "outline"}
                        size="sm"
                        onClick={() => toggleHabit(habit.id)}
                        className={habit.completed ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        {habit.completed ? (
                          <>
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Done
                          </>
                        ) : (
                          <>
                            <Clock className="w-4 h-4 mr-2" />
                            Mark Done
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="suggested" className="space-y-4">
          <div className="grid gap-4">
            {suggestedHabits.map(habit => (
              <Card key={habit.id} className="transition-all duration-200 hover:shadow-lg">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg ${habit.color}`}>
                        {habit.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{habit.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{habit.description}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{habit.category}</Badge>
                          <Badge variant="secondary">{habit.frequency}</Badge>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Star className="w-3 h-3 text-yellow-500" />
                            <span>Recommended</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addHabit(habit)}
                      disabled={habits.some(h => h.title === habit.title)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {habits.some(h => h.title === habit.title) ? 'Added' : 'Add Habit'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}