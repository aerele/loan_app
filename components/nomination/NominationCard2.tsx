'use client';

import { Box, Typography, Paper } from '@mui/material';
import CheckCircleSharpIcon from '@mui/icons-material/CheckCircleSharp';

type NominationData = {
  name: string;
  id: string;
  amount: number;
  type: string;
};

type cardValue = {
  data: NominationData;
};

function NominationCard2({ data }: cardValue) {
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        bgcolor: 'white',
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <CheckCircleSharpIcon sx={{ fontSize: 30, color: '#A1A2A1' }} />

        <Box>
          <Typography fontWeight={600}>{data?.name}</Typography>
          <Typography fontSize={12} color="#6B7280">
            05 Jan 2024 • ₹{data?.amount.toLocaleString()}
          </Typography>
        </Box>
      </Box>

      <Box
        sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: 1,
          bgcolor: '#A3A3A3',
        }}
      >
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          APPROVED
        </Typography>
      </Box>
    </Paper>
  );
}

export default NominationCard2;
