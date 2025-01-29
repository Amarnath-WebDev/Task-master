import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Achievement } from '../../types';

interface UserStatsState {
  totalPoints: number;
  tasksCompleted: number;
  pomodoroSessions: number;
  currentStreak: number;
  achievements: Achievement[];
}

const initialState: UserStatsState = {
  totalPoints: 0,
  tasksCompleted: 0,
  pomodoroSessions: 0,
  currentStreak: 0,
  achievements: [],
};

const userStatsSlice = createSlice({
  name: 'userStats',
  initialState,
  reducers: {
    addPoints: (state, action: PayloadAction<number>) => {
      state.totalPoints += action.payload;
    },
    incrementTasksCompleted: (state) => {
      state.tasksCompleted += 1;
      state.totalPoints += 10;
    },
    incrementPomodoroSessions: (state) => {
      state.pomodoroSessions += 1;
      state.totalPoints += 5;
    },
    updateStreak: (state, action: PayloadAction<number>) => {
      state.currentStreak = action.payload;
      state.totalPoints += 2;
    },
    unlockAchievement: (state, action: PayloadAction<Achievement>) => {
      if (!state.achievements.some(a => a.id === action.payload.id)) {
        state.achievements.push(action.payload);
        state.totalPoints += 20;
      }
    },
  },
});

export const {
  addPoints,
  incrementTasksCompleted,
  incrementPomodoroSessions,
  updateStreak,
  unlockAchievement,
} = userStatsSlice.actions;
export default userStatsSlice.reducer;