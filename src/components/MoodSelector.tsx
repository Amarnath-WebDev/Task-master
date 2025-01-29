import { useState } from 'react';
import { Paper, Typography, Box, IconButton, Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { Smile, Meh, Frown } from 'lucide-react';

const MoodSelector = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
    setOpenDialog(true);
  };

  return (
    <>
      <Paper sx={{ 
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3
      }}>
        <Typography variant="h6" sx={{ mb: 3, color: 'text.primary' }}>
          How are you feeling?
        </Typography>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-around',
          alignItems: 'center'
        }}>
          <IconButton 
            onClick={() => handleMoodSelect('great')}
            sx={{ 
              color: 'primary.main',
              '&:hover': { color: 'primary.light' }
            }}
          >
            <Smile size={32} />
          </IconButton>
          <IconButton 
            onClick={() => handleMoodSelect('okay')}
            sx={{ 
              color: 'warning.main',
              '&:hover': { color: 'warning.light' }
            }}
          >
            <Meh size={32} />
          </IconButton>
          <IconButton 
            onClick={() => handleMoodSelect('bad')}
            sx={{ 
              color: 'error.main',
              '&:hover': { color: 'error.light' }
            }}
          >
            <Frown size={32} />
          </IconButton>
        </Box>
      </Paper>

      <Dialog 
        open={openDialog} 
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: 2,
            minWidth: 300
          }
        }}
      >
        <DialogTitle sx={{ textAlign: 'center', color: 'text.primary' }}>
          {selectedMood === 'great' && "That's awesome! 🎉"}
          {selectedMood === 'okay' && "Hang in there! 💪"}
          {selectedMood === 'bad' && "Take care! 💝"}
        </DialogTitle>
        <DialogContent>
          <Typography sx={{ textAlign: 'center', color: 'text.secondary' }}>
            {selectedMood === 'great' && "Keep up the great work! Your positive energy will help you achieve your goals."}
            {selectedMood === 'okay' && "Remember to take breaks when needed. Every step forward counts!"}
            {selectedMood === 'bad' && "It's okay to have tough days. Consider taking a break or talking to someone."}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Button 
            onClick={() => setOpenDialog(false)}
            variant="contained"
            sx={{ 
              borderRadius: 2,
              px: 4
            }}
          >
            Got it
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default MoodSelector;