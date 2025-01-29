import React, { useState, useEffect, useCallback } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  IconButton,
  CircularProgress,
  Slider,
  Stack,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee,
  Brain
} from 'lucide-react';

// Pre-load the audio
const alarmSound = new Audio('/notification.mp3');
alarmSound.preload = 'auto';

const PomodoroPage = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');
  const [showAlert, setShowAlert] = useState(false);
  const [settings, setSettings] = useState({
    workDuration: 25,
    breakDuration: 5,
  });

  const percentage = useCallback(() => {
    const total = mode === 'work' ? settings.workDuration * 60 : settings.breakDuration * 60;
    return ((total - timeLeft) / total) * 100;
  }, [timeLeft, mode, settings]);

  const playSound = async () => {
    try {
      alarmSound.currentTime = 0;
      await alarmSound.play();
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      playSound();
      setShowAlert(true);
      setIsRunning(false);
      setMode(mode === 'work' ? 'break' : 'work');
      setTimeLeft(mode === 'work' ? settings.breakDuration * 60 : settings.workDuration * 60);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode, settings]);

  // Request notification permission on component mount
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? settings.workDuration * 60 : settings.breakDuration * 60);
  };

  const toggleMode = () => {
    setIsRunning(false);
    setMode(mode === 'work' ? 'break' : 'work');
    setTimeLeft(mode === 'work' ? settings.breakDuration * 60 : settings.workDuration * 60);
  };

  return (
    <Box sx={{ 
      maxWidth: 600, 
      mx: 'auto', 
      mt: 4, 
      px: 2 
    }}>
      <Paper sx={{ 
        p: 4, 
        borderRadius: 4,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: 4,
          bgcolor: mode === 'work' ? 'primary.main' : 'secondary.main',
          width: `${percentage()}%`,
          transition: 'width 1s linear'
        }} />

        <Typography variant="h4" sx={{ mb: 4, fontWeight: 600 }}>
          {mode === 'work' ? 'Work Time' : 'Break Time'}
        </Typography>

        <Box sx={{ position: 'relative', display: 'inline-block', mb: 4 }}>
          <CircularProgress
            variant="determinate"
            value={percentage()}
            size={200}
            thickness={4}
            sx={{
              color: mode === 'work' ? 'primary.main' : 'secondary.main',
            }}
          />
          <Box sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}>
            <Typography variant="h2" sx={{ fontWeight: 700 }}>
              {formatTime(timeLeft)}
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
          <IconButton 
            onClick={() => setIsRunning(!isRunning)}
            sx={{ 
              bgcolor: isRunning ? 'error.main' : 'primary.main',
              color: 'white',
              '&:hover': {
                bgcolor: isRunning ? 'error.dark' : 'primary.dark',
              },
              width: 56,
              height: 56
            }}
          >
            {isRunning ? <Pause size={24} /> : <Play size={24} />}
          </IconButton>
          <IconButton 
            onClick={handleReset}
            sx={{ 
              bgcolor: 'background.paper',
              color: 'text.primary',
              border: 1,
              borderColor: 'divider',
              '&:hover': { 
                bgcolor: 'action.hover'
              },
              width: 56,
              height: 56
            }}
          >
            <RotateCcw size={24} />
          </IconButton>
          <IconButton 
            onClick={toggleMode}
            sx={{ 
              bgcolor: mode === 'work' ? 'secondary.main' : 'primary.main',
              color: 'white',
              '&:hover': { 
                bgcolor: mode === 'work' ? 'secondary.dark' : 'primary.dark'
              },
              width: 56,
              height: 56
            }}
          >
            {mode === 'work' ? <Coffee size={24} /> : <Brain size={24} />}
          </IconButton>
        </Stack>

        <Box sx={{ px: 4 }}>
          <Typography gutterBottom>
            {mode === 'work' ? 'Work Duration' : 'Break Duration'}
          </Typography>
          <Slider
            value={mode === 'work' ? settings.workDuration : settings.breakDuration}
            min={1}
            max={60}
            onChange={(_, value) => {
              setSettings(prev => ({
                ...prev,
                [mode === 'work' ? 'workDuration' : 'breakDuration']: value as number
              }));
              setTimeLeft((value as number) * 60);
            }}
            sx={{ color: mode === 'work' ? 'primary.main' : 'secondary.main' }}
          />
        </Box>
      </Paper>

      <Snackbar 
        open={showAlert} 
        autoHideDuration={6000} 
        onClose={() => setShowAlert(false)}
      >
        <Alert 
          severity={mode === 'work' ? 'success' : 'info'} 
          sx={{ width: '100%' }}
        >
          {mode === 'work' 
            ? 'Great job! Time for a break!' 
            : 'Break is over! Ready to get back to work?'}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default PomodoroPage; 