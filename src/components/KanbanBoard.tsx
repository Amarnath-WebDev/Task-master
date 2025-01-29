import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Droppable } from '@hello-pangea/dnd';
import Task from './Task';
import { Paper, Typography, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Box from '@mui/material/Box';
import { addTask } from '../store/slices/tasksSlice';
import { Task as TaskType } from '../types';

const KanbanBoard: React.FC = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const columns = useSelector((state: RootState) => state.tasks.columns);
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const handleAddTask = () => {
    if (newTask.title) {
      dispatch(addTask({
        id: Date.now().toString(),
        title: newTask.title,
        description: newTask.description,
        status: 'todo',
        priority: 'medium',
        dueDate: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        points: 0
      } as TaskType));
      setNewTask({ title: '', description: '' });
      setOpen(false);
    }
  };

  const columnTitles = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  return (
    <Box sx={{ 
      width: '100%',
      maxWidth: '1400px',
      mx: 'auto',
      p: { xs: 1, sm: 2, md: 3 }
    }}>
      <Box sx={{ 
        mb: { xs: 2, sm: 4 },
        display: 'flex',
        justifyContent: 'center'
      }}>
        <Button 
          variant="contained" 
          onClick={() => setOpen(true)}
          sx={{ 
            px: { xs: 3, sm: 4 }, 
            py: 1.5,
            width: { xs: '100%', sm: 'auto' }
          }}
        >
          Add New Task
        </Button>
      </Box>

      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',               // Single column on mobile
          sm: 'repeat(2, 1fr)',    // Two columns on tablet
          md: 'repeat(3, 1fr)'     // Three columns on desktop
        },
        gap: { xs: 2, sm: 3 },
        alignItems: 'start'
      }}>
        {Object.entries(columns).map(([columnId, taskIds]) => (
          <Paper 
            key={columnId} 
            sx={{ 
              p: { xs: 1.5, sm: 2 },
              height: '100%',
              minHeight: '200px',
              backgroundColor: 'background.paper',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <Typography 
              variant="h6" 
              sx={{ 
                py: 1.5,
                px: 1,
                textAlign: 'center',
                fontWeight: 600,
                borderBottom: '2px solid',
                borderColor: 'divider',
                mb: 2
              }}
            >
              {columnTitles[columnId as keyof typeof columnTitles]}
            </Typography>
            <Droppable droppableId={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    minHeight: '100px',
                    maxHeight: 'calc(100vh - 300px)',
                    overflowY: 'auto',
                    padding: '8px'
                  }}
                >
                  {taskIds.map((taskId, index) => (
                    <Task
                      key={taskId}
                      task={tasks[taskId]}
                      index={index}
                      columnId={columnId}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </Paper>
        ))}
      </Box>

      <Dialog 
        open={open} 
        onClose={() => setOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            width: { xs: '95%', sm: '80%', md: '600px' },
            m: 'auto'
          }
        }}
      >
        <DialogTitle sx={{ color: 'text.primary' }}>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            fullWidth
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            sx={{ 
              mb: 2,
              '& .MuiInputLabel-root': {
                color: 'text.secondary'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'divider'
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main'
                }
              }
            }}
          />
          <TextField
            margin="dense"
            label="Description"
            fullWidth
            multiline
            rows={4}
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            sx={{ 
              '& .MuiInputLabel-root': {
                color: 'text.secondary'
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'divider'
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main'
                }
              }
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button 
            onClick={() => setOpen(false)}
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'action.hover'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleAddTask} 
            variant="contained"
            sx={{ 
              px: 3,
              borderRadius: 1
            }}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default KanbanBoard;