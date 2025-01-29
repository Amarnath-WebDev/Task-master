export type Priority = 'low' | 'medium' | 'high';
export type Status = 'todo' | 'in-progress' | 'completed';
export type Mood = 'energetic' | 'focused' | 'neutral' | 'tired' | 'stressed';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  dueDate: string;
  createdAt: string;
  mood?: Mood;
  energyLevel?: number;
  points: number;
}

export interface PomodoroSettings {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
}

export interface UserStats {
  totalPoints: number;
  tasksCompleted: number;
  pomodoroSessions: number;
  currentStreak: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface Column {
  id: Status;
  title: string;
  taskIds: string[];
}