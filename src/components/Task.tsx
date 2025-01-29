import React from 'react';
import { Draggable } from '@hello-pangea/dnd';
import { Card, CardContent, Typography, Box, IconButton, Chip } from '@mui/material';
import { X as DeleteIcon } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { deleteTask } from '../store/slices/tasksSlice';
import { Task as TaskType } from '../types';
import { Status } from '../store/slices/tasksSlice';

interface TaskProps {
  task: TaskType;
  index: number;
  columnId: string;
}

const Task: React.FC<TaskProps> = ({ task, index, columnId }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteTask({ taskId: task.id, columnId: columnId as Status }));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            mb: 2,
            bgcolor: 'background.paper',
            borderRadius: 2,
            position: 'relative',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: (theme) => theme.shadows[6]
            }
          }}
        >
          <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'flex-start',
              mb: 2,
              pr: 4
            }}>
              <Typography 
                variant="h6" 
                sx={{ 
                  fontSize: '1.1rem', 
                  fontWeight: 600,
                  color: 'text.primary',
                  flexGrow: 1,
                  lineHeight: 1.3,
                  wordBreak: 'break-word',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  mb: 1
                }}
              >
                {task.title}
              </Typography>
              <IconButton 
                onClick={handleDelete}
                size="small"
                sx={{ 
                  position: 'absolute',
                  top: 8,
                  right: 8,
                  color: 'error.main',
                  '&:hover': {
                    bgcolor: 'error.main',
                    color: 'white'
                  }
                }}
              >
                <DeleteIcon size={18} />
              </IconButton>
            </Box>
            
            <Typography 
              variant="body2" 
              sx={{ 
                mb: 2,
                color: 'text.secondary',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word'
              }}
            >
              {task.description}
            </Typography>

            <Box sx={{ 
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              mt: 'auto'
            }}>
              <Chip 
                label={task.priority}
                size="small"
                color={getPriorityColor(task.priority)}
                sx={{ 
                  textTransform: 'capitalize',
                  fontWeight: 500
                }}
              />
              <Typography 
                variant="caption" 
                sx={{ color: 'text.secondary' }}
              >
                {new Date(task.createdAt).toLocaleDateString()}
              </Typography>
            </Box>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
};

export default Task; 