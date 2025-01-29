import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Paper, Typography, Button } from '@mui/material';

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let timer: number;
    if (isRunning && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const toggleTimer = () => setIsRunning(!isRunning);
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(25 * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <Paper sx={{ 
      p: 3, 
      textAlign: 'center',
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: 3
    }}>
      <Typography variant="h6" sx={{ mb: 2, color: 'text.primary' }}>
        Pomodoro Timer
      </Typography>
      <Typography variant="h3" sx={{ 
        mb: 3, 
        fontWeight: 'bold',
        color: 'primary.main'
      }}>
        {formatTime(timeLeft)}
      </Typography>
      <Button 
        variant="contained" 
        onClick={toggleTimer}
        sx={{ 
          px: 4, 
          py: 1,
          borderRadius: 2,
          backgroundColor: isRunning ? 'error.main' : 'primary.main',
          '&:hover': {
            backgroundColor: isRunning ? 'error.dark' : 'primary.dark',
          }
        }}
      >
        {isRunning ? 'Stop' : 'Start'}
      </Button>
    </Paper>
  );
};

export default PomodoroTimer;