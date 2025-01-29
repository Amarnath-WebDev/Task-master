import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PomodoroState {
  workDuration: number;
  shortBreakDuration: number;
  longBreakDuration: number;
  sessionsBeforeLongBreak: number;
  currentSession: number;
  totalSessions: number;
}

const initialState: PomodoroState = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  sessionsBeforeLongBreak: 4,
  currentSession: 0,
  totalSessions: 0,
};

const pomodoroSlice = createSlice({
  name: 'pomodoro',
  initialState,
  reducers: {
    incrementSession: (state) => {
      state.currentSession = (state.currentSession + 1) % state.sessionsBeforeLongBreak;
      state.totalSessions += 1;
    },
    updateSettings: (state, action: PayloadAction<Partial<PomodoroState>>) => {
      return { ...state, ...action.payload };
    },
    resetSessions: (state) => {
      state.currentSession = 0;
    },
  },
});

export const { incrementSession, updateSettings, resetSessions } = pomodoroSlice.actions;
export default pomodoroSlice.reducer;