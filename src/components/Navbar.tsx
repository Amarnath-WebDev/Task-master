import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';

const Navbar: React.FC = () => {
  const buttons = useSelector((state: RootState) => state.tasks.buttons);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <Badge badgeContent={buttons.length} color="secondary">
          <Button color="inherit">
            Selected Tasks: {buttons.length}
          </Button>
        </Badge>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 