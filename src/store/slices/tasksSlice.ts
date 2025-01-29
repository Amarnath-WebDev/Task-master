import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../types';

export type Status = 'todo' | 'in-progress' | 'completed';

interface TasksState {
  tasks: { [key: string]: Task };
  columns: {
    [K in Status]: string[];
  };
  buttons: string[];
}

const initialState: TasksState = {
  tasks: {},
  columns: {
    'todo': [],
    'in-progress': [],
    'completed': [],
  },
  buttons: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      state.tasks[task.id] = task;
      state.columns[task.status].push(task.id);
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const task = action.payload;
      const oldTask = state.tasks[task.id];
      if (oldTask.status !== task.status) {
        state.columns[oldTask.status] = state.columns[oldTask.status].filter(
          id => id !== task.id
        );
        state.columns[task.status].push(task.id);
      }
      state.tasks[task.id] = task;
    },
    moveTask: (
      state,
      action: PayloadAction<{
        taskId: string;
        source: Status;
        destination: Status;
        index: number;
      }>
    ) => {
      const { taskId, source, destination, index } = action.payload;
      state.columns[source] = state.columns[source].filter(id => id !== taskId);
      state.columns[destination].splice(index, 0, taskId);
      state.tasks[taskId].status = destination;
    },
    deleteTask: (state, action: PayloadAction<{ taskId: string; columnId: Status }>) => {
      const { taskId, columnId } = action.payload;
      delete state.tasks[taskId];
      state.columns[columnId] = state.columns[columnId].filter(id => id !== taskId);
    },
    addButton: (state, action: PayloadAction<string>) => {
      state.buttons.push(action.payload);
    },
    removeButton: (state, action: PayloadAction<string>) => {
      state.buttons = state.buttons.filter(buttonId => buttonId !== action.payload);
    },
  },
});

export const { addTask, updateTask, moveTask, deleteTask, addButton, removeButton } = tasksSlice.actions;
export default tasksSlice.reducer;