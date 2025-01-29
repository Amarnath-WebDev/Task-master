import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useSelector } from 'react-redux';
import { Paper, Typography, Box, useTheme } from '@mui/material';
import type { RootState } from '../store';

const Calendar: React.FC = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  const events = Object.values(tasks).map(task => ({
    id: task.id,
    title: task.title,
    start: task.dueDate,
    backgroundColor: task.priority === 'high' ? theme.palette.error.main :
                    task.priority === 'medium' ? theme.palette.warning.main :
                    theme.palette.success.main,
    borderColor: 'transparent',
    textColor: isDark ? theme.palette.common.white : theme.palette.common.black,
  }));

  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 2, md: 3 },
          borderRadius: 2,
          bgcolor: 'background.paper',
          '.fc': {
            '--fc-page-bg-color': 'transparent',
            '--fc-border-color': theme.palette.divider,
            '--fc-today-bg-color': isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            '--fc-neutral-bg-color': isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(0, 0, 0, 0.02)',
            '--fc-list-event-hover-bg-color': isDark ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 0, 0, 0.04)',
            '--fc-highlight-color': theme.palette.primary.main + '20',
            color: theme.palette.text.primary,
          },
          '& .fc-theme-standard .fc-scrollgrid': {
            borderColor: theme.palette.divider,
          },
          '& .fc .fc-col-header-cell-cushion': {
            color: theme.palette.text.primary,
            padding: '8px',
            fontWeight: 600,
          },
          '& .fc .fc-daygrid-day-number': {
            color: theme.palette.text.secondary,
            padding: '8px',
          },
          '& .fc-direction-ltr .fc-button-group > .fc-button': {
            backgroundColor: theme.palette.background.paper,
            borderColor: theme.palette.divider,
            color: theme.palette.text.primary,
            textTransform: 'capitalize',
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
            '&.fc-button-active': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              borderColor: theme.palette.primary.main,
            },
          },
          '& .fc .fc-toolbar-title': {
            color: theme.palette.text.primary,
            fontSize: '1.5rem',
            fontWeight: 600,
          },
          '& .fc-event': {
            borderRadius: '6px',
            padding: '2px 4px',
            margin: '2px 0',
            cursor: 'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'translateY(-1px)',
            },
          },
          '& .fc .fc-toolbar.fc-header-toolbar': {
            mb: 3,
            flexWrap: 'wrap',
            gap: 1,
          },
          '& .fc-toolbar-chunk': {
            display: 'flex',
            gap: 1,
          },
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
          Task Calendar
        </Typography>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,dayGridWeek'
          }}
          height="auto"
          dayMaxEvents={3}
          eventDisplay="block"
          eventTimeFormat={{
            hour: 'numeric',
            minute: '2-digit',
            meridiem: 'short'
          }}
          buttonText={{
            today: 'Today',
            month: 'Month',
            week: 'Week'
          }}
        />
      </Paper>
    </Box>
  );
};

export default Calendar;