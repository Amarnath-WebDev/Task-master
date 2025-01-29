import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import tasksReducer from './slices/tasksSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: tasksReducer,
    // ... other reducers
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;