'use client';

import { Box, Typography, Avatar } from '@mui/material';

export default function UserHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#fff',
      }}
    >
      <Avatar src="/user.png" />

      <Box>
        <Typography fontSize={12} color="text.secondary">
          SHG उपयोगकर्ता
        </Typography>
        <Typography fontWeight={700}>स्वाति दीक्षित</Typography>
      </Box>
    </Box>
  );
}
