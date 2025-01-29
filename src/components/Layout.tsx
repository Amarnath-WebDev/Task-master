import React, { useState } from 'react';
import { 
  AppBar, 
  Box, 
  Button, 
  Container, 
  Drawer, 
  IconButton, 
  Toolbar, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  ListItemIcon,
  Avatar,
  Stack,
  Paper
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Sun,
  Moon,
  X,
  LayoutDashboard,
  PlusCircle,
  Clock,
  Calendar as CalendarIcon,
  Settings as SettingsIcon,
  NotificationIcon,
  UserIcon
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import type { RootState } from '../store';

const menuItems = [
  { text: 'Dashboard', path: '/', icon: <LayoutDashboard size={20} /> },
  { text: 'Add Task', path: '/add-task', icon: <PlusCircle size={20} /> },
  { text: 'Pomodoro', path: '/pomodoro', icon: <Clock size={20} /> },
  { text: 'Calendar', path: '/calendar', icon: <CalendarIcon size={20} /> },
  { text: 'Settings', path: '/settings', icon: <SettingsIcon size={20} /> }
];

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  const handleMenuClick = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Top Navigation Bar */}
      <AppBar 
        position="fixed"
        sx={{
          backdropFilter: 'blur(8px)',
          backgroundColor: 'background.default',
          borderBottom: '1px solid',
          borderColor: 'divider',
          boxShadow: 'none'
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {/* Mobile Menu Icon */}
          <IconButton
            onClick={() => setDrawerOpen(true)}
            sx={{ 
              color: 'text.primary',
              display: { xs: 'flex', md: 'none' }
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* Logo */}
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.primary', 
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 1
            }}
          >
            Task Master
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ 
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1
          }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                onClick={() => handleMenuClick(item.path)}
                startIcon={item.icon}
                sx={{
                  px: 2,
                  py: 1,
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          {/* Right Actions */}
          <Box sx={{ 
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}>
            <IconButton 
              onClick={() => dispatch(toggleTheme())}
              sx={{ color: 'text.primary' }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: '100%',
          minHeight: '100vh',
          p: { xs: 2, sm: 3 },
          pt: { xs: '80px', sm: '80px' },
          pb: 4
        }}
      >
        <Container 
          maxWidth="xl" 
          sx={{ 
            px: { xs: 0, sm: 2 },
            mx: 'auto',
            height: '100%'
          }}
        >
          {children}
        </Container>
      </Box>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        ModalProps={{
          keepMounted: true
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: { xs: '85%', sm: 320 },
            bgcolor: 'background.paper',
            boxShadow: 'none'
          },
        }}
      >
        <Box sx={{ 
          p: { xs: 2, sm: 3 },
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            mb: 3
          }}>
            <Typography variant="h6" sx={{ color: 'text.primary', fontWeight: 600 }}>
              Task Master
            </Typography>
            <IconButton 
              onClick={() => setDrawerOpen(false)}
              sx={{ color: 'text.secondary' }}
            >
              <X size={20} />
            </IconButton>
          </Box>

          <Box sx={{ flexGrow: 1 }}>
            {menuItems.map((item) => (
              <Button
                key={item.text}
                onClick={() => handleMenuClick(item.path)}
                startIcon={item.icon}
                sx={{
                  width: '100%',
                  justifyContent: 'flex-start',
                  px: 2,
                  py: { xs: 1.5, sm: 2 },
                  mb: { xs: 1, sm: 1.5 },
                  borderRadius: 2,
                  fontSize: { xs: '0.9rem', sm: '1rem' },
                  color: location.pathname === item.path ? 'primary.main' : 'text.secondary',
                  bgcolor: location.pathname === item.path ? 'primary.light' : 'transparent',
                  '&:hover': {
                    bgcolor: 'action.hover'
                  }
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>

          <Box sx={{ pt: 2, mt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => dispatch(toggleTheme())}
              startIcon={isDark ? <Sun size={20} /> : <Moon size={20} />}
              sx={{ 
                justifyContent: 'flex-start',
                py: { xs: 1, sm: 1.5 },
                color: 'text.primary',
                borderColor: 'divider',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'primary.light'
                }
              }}
            >
              {isDark ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default Layout;