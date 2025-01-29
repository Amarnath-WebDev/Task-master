import React from 'react';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { CheckCircle, ListTodo, Clock, TrendingUp } from 'lucide-react';

const StatsPanel = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const columns = useSelector((state: RootState) => state.tasks.columns);
  const theme = useTheme();

  const totalTasks = Object.keys(tasks).length;
  const completedTasks = columns['completed']?.length || 0;
  const inProgressTasks = columns['in-progress']?.length || 0;
  const pendingTasks = columns['todo']?.length || 0;

  const stats = [
    {
      label: 'Total Tasks',
      value: totalTasks,
      icon: <ListTodo size={24} />,
      color: theme.palette.primary.main,
    },
    {
      label: 'Completed',
      value: completedTasks,
      icon: <CheckCircle size={24} />,
      color: theme.palette.success.main,
    },
    {
      label: 'In Progress',
      value: inProgressTasks,
      icon: <Clock size={24} />,
      color: theme.palette.warning.main,
    },
    {
      label: 'Pending',
      value: pendingTasks,
      icon: <TrendingUp size={24} />,
      color: theme.palette.info.main,
    },
  ];

  return (
    <Paper sx={{ 
      p: 3,
      bgcolor: 'background.paper',
      borderRadius: 2,
      boxShadow: theme.shadows[3]
    }}>
      <Typography variant="h6" sx={{ 
        mb: 3, 
        color: 'text.primary',
        fontWeight: 600,
        display: 'flex',
        alignItems: 'center',
        gap: 1
      }}>
        Statistics
      </Typography>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
        gap: 2
      }}>
        {stats.map((stat) => (
          <Box
            key={stat.label}
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: `${stat.color}10`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transition: 'transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
              }
            }}
          >
            <Box sx={{ 
              color: stat.color,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {stat.icon}
            </Box>
            <Typography variant="h4" sx={{ 
              color: stat.color,
              fontWeight: 700,
              mb: 0.5
            }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" sx={{ 
              color: 'text.secondary',
              textAlign: 'center'
            }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Paper>
  );
};

export default StatsPanel;