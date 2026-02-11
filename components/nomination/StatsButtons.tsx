'use client';

import { Box, Paper, Typography } from '@mui/material';

export default function StatsButtons() {
  return (
    <Box display="flex" gap={2} mb={2}>
      {/* Nomination Submitted */}
      <Paper
        sx={{
          flex: 1,
          p: 2,
          borderRadius: 3,
          border: '3px solid #000',
        }}
      >
        <Typography fontSize={13}>नॉमिनेशन जमा किया गया</Typography>
        <Typography color="text.secondary" fontSize={13}>
          Nomination Submitted
        </Typography>

        <Typography fontWeight={700} fontSize={28}>
          12
        </Typography>
      </Paper>

      {/* Ready for Review */}
      <Paper
        sx={{
          flex: 1,
          p: 2,
          borderRadius: 3,
          backgroundColor: 'white',
        }}
      >
        <Typography fontSize={13}>स्वीकृति के लिए तैयार</Typography>
        <Typography color="text.secondary" fontSize={13}>
          Ready for Training
        </Typography>

        <Typography fontWeight={700} fontSize={28}>
          34
        </Typography>
      </Paper>
    </Box>
  );
}
