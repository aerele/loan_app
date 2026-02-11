'use client';

import { Box, Typography, Button, Paper } from '@mui/material';

export default function CreateNominationBox() {
  return (
    <Paper
      sx={{
        p: 3,
        borderRadius: 4,
        backgroundColor: 'white',
      }}
    >
      <Typography fontWeight={700}>नया नामांकन शुरू कर</Typography>

      <Typography color="text.secondary" mb={2}>
        Create New Nomination
      </Typography>

      <Button
        fullWidth
        sx={{
          backgroundColor: '#000',
          color: '#fff',
          borderRadius: 3,
          py: 1.5,
          textTransform: 'none',
        }}
      >
        Create Nomination
      </Button>
    </Paper>
  );
}
