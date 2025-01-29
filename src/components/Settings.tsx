import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Stack,
  Avatar,
  TextField,
  IconButton,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Bell,
  Moon,
  Volume2,
  Globe,
  Shield,
  Upload,
  Mail,
  Palette,
  Clock,
  User
} from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../store/slices/themeSlice';
import { useState } from 'react';
import type { RootState } from '../store';

const Settings = () => {
  const dispatch = useDispatch();
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const [language, setLanguage] = useState('english');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleSave = () => {
    setSnackbarMessage('Settings saved successfully!');
    setShowSnackbar(true);
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: { xs: 2, sm: 3 } }}>
      <Typography variant="h5" sx={{ mb: 4, fontWeight: 600 }}>
        Settings
      </Typography>

      {/* Profile Section */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <User size={20} /> Profile Settings
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} alignItems="center" sx={{ mb: 3 }}>
          <Avatar sx={{ width: 80, height: 80 }} />
          <Box sx={{ flexGrow: 1 }}>
            <Button
              variant="outlined"
              component="label"
              startIcon={<Upload size={18} />}
              sx={{ mb: 1 }}
            >
              Upload Photo
              <input hidden accept="image/*" type="file" />
            </Button>
            <Typography variant="body2" color="text.secondary">
              Recommended: Square image, at least 200x200px
            </Typography>
          </Box>
        </Stack>
        <Stack spacing={3}>
          <TextField label="Display Name" defaultValue="User Name" />
          <TextField label="Email" defaultValue="user@example.com" type="email" />
        </Stack>
      </Paper>

      {/* Appearance Section */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Palette size={20} /> Appearance
        </Typography>
        <Stack spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Moon size={20} />
              <Typography>Dark Mode</Typography>
            </Box>
            <Switch checked={isDark} onChange={() => dispatch(toggleTheme())} />
          </Box>
        </Stack>
      </Paper>

      {/* Preferences Section */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Clock size={20} /> Preferences
        </Typography>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <InputLabel>Language</InputLabel>
            <Select
              value={language}
              label="Language"
              onChange={(e) => setLanguage(e.target.value)}
            >
              <MenuItem value="english">English</MenuItem>
              <MenuItem value="spanish">Spanish</MenuItem>
              <MenuItem value="french">French</MenuItem>
              <MenuItem value="german">German</MenuItem>
              <MenuItem value="chinese">Chinese</MenuItem>
            </Select>
          </FormControl>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Bell size={20} />
              <Typography>Notifications</Typography>
            </Box>
            <Switch 
              checked={notificationsEnabled} 
              onChange={(e) => setNotificationsEnabled(e.target.checked)} 
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Volume2 size={20} />
              <Typography>Sound Effects</Typography>
            </Box>
            <Switch 
              checked={soundEnabled} 
              onChange={(e) => setSoundEnabled(e.target.checked)} 
            />
          </Box>
        </Stack>
      </Paper>

      {/* Privacy Section */}
      <Paper sx={{ p: 3, mb: 3, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
          <Shield size={20} /> Privacy & Security
        </Typography>
        <Stack spacing={3}>
          <TextField 
            label="Current Password" 
            type="password" 
            sx={{ mb: 2 }}
          />
          <TextField 
            label="New Password" 
            type="password" 
            sx={{ mb: 2 }}
          />
          <TextField 
            label="Confirm New Password" 
            type="password"
          />
        </Stack>
      </Paper>

      {/* Action Buttons */}
      <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button variant="outlined" color="inherit">
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </Box>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={() => setShowSnackbar(false)}
      >
        <Alert 
          onClose={() => setShowSnackbar(false)} 
          severity="success" 
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 