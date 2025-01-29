import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Layout from './components/Layout';
import KanbanBoard from './components/KanbanBoard';
import Calendar from './components/Calendar';
import StatsPanel from './components/StatsPanel';
import { useDispatch, useSelector } from 'react-redux';
import { moveTask } from './store/slices/tasksSlice';
import { Status } from './store/slices/tasksSlice';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Settings from './components/Settings';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { lightTheme, darkTheme } from './theme';
import { RootState } from './store';
import PomodoroPage from './components/PomodoroPage';
import PomodoroTimer from './components/PomodoroTimer';
import MoodSelector from './components/MoodSelector';
import VoiceControl from './components/VoiceControl';

function ThemedApp() {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    dispatch(moveTask({
      taskId: draggableId,
      source: source.droppableId as Status,
      destination: destination.droppableId as Status,
      index: destination.index
    }));
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <CssBaseline />
      <DragDropContext onDragEnd={onDragEnd}>
        <BrowserRouter>
          <Layout>
            <Box sx={{ 
              maxWidth: '1400px', 
              mx: 'auto',
              width: '100%'
            }}>
              <Routes>
                <Route path="/" element={
                  <Box sx={{ 
                    display: 'grid', 
                    gap: 3,
                    gridTemplateColumns: { xs: '1fr', lg: '3fr 1fr' }
                  }}>
                    <Box sx={{ display: 'grid', gap: 3 }}>
                      <StatsPanel />
                      <KanbanBoard />
                    </Box>
                    <Box sx={{ 
                      display: 'grid', 
                      gap: 3,
                      height: 'fit-content'
                    }}>
                      <PomodoroTimer />
                      <MoodSelector />
                      <VoiceControl />
                    </Box>
                  </Box>
                } />
                <Route path="/add-task" element={<KanbanBoard />} />
                <Route path="/pomodoro" element={<PomodoroPage />} />
                <Route path="/calendar" element={<Calendar />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </Box>
          </Layout>
        </BrowserRouter>
      </DragDropContext>
    </ThemeProvider>
  );
}

function App() {
  return (
    <Provider store={store}>
      <ThemedApp />
    </Provider>
  );
}

export default App;