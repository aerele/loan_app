'use client';

import { Box, Typography, Avatar, IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Title1 from '@/components/Titel1';

type AppHeaderProps = {
  showBack?: boolean;
  onBack?: () => void;

  showUser?: boolean;
  userName?: string;

  h1?: string;
  h2?: string;
};

export default function AppHeader({
  showBack = false,
  onBack,
  showUser = false,
  userName,
  h1,
  h2,
}: AppHeaderProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        p: 2,
        borderBottom: '1px solid #E5E7EB',
        backgroundColor: '#fff',
        flexShrink: 0,
      }}
    >
      {showBack && (
        <IconButton onClick={onBack}>
          <ArrowBackIcon />
        </IconButton>
      )}

      {showUser && (
        <>
          <Avatar src="/user.png" />
          <Box>
            <Typography fontSize={12} color="text.secondary">
              SHG उपयोगकर्ता
            </Typography>
            <Typography fontWeight={700}>{userName}</Typography>
          </Box>
        </>
      )}

      {!showUser && h1 && (
        <Box>
          <Title1
            h1={h1}
            h2={h2}
            h1style={{ fontSize: 14, fontWeight: 600 }}
            h2style={{ fontSize: 12 }}
          />
        </Box>
      )}
    </Box>
  );
}
