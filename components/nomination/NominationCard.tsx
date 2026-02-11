'use client';

import { Box, Typography, Paper } from '@mui/material';

export default function NominationCard() {
  return (
    <Paper
      sx={{
        p: 2,
        borderRadius: 3,
        borderLeft: '4px solid #000',
      }}
    >
      <Typography fontWeight={700}>Meena Kumari</Typography>

      <Typography fontSize={13} color="text.secondary">
        ID: SHG NAME - 123
      </Typography>

      <Box mt={2} display="flex" justifyContent="space-between">
        <Box>
          <Typography color="text.secondary">क्रेडिट सीमा</Typography>
          <Typography>Credit Limit</Typography>
        </Box>

        <Typography fontWeight={700}>₹50,000</Typography>
      </Box>
    </Paper>
  );
}
