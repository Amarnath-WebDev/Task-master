import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addButton, removeButton } from '../store/slices/tasksSlice';
import { RootState } from '../store';
import Button from '@mui/material/Button';

interface TaskButtonProps {
  taskId: string;
}

const TaskButton: React.FC<TaskButtonProps> = ({ taskId }) => {
  const dispatch = useDispatch();
  const buttons = useSelector((state: RootState) => state.tasks.buttons);
  const isAdded = buttons.includes(taskId);

  const handleToggleButton = () => {
    if (isAdded) {
      dispatch(removeButton(taskId));
    } else {
      dispatch(addButton(taskId));
    }
  };

  return (
    <Button
      variant={isAdded ? "contained" : "outlined"}
      color={isAdded ? "error" : "primary"}
      onClick={handleToggleButton}
      size="small"
    >
      {isAdded ? 'Remove' : 'Add'}
    </Button>
  );
};

export default TaskButton; 