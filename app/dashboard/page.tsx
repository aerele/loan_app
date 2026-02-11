'use client';

import { Box } from '@mui/material';
import UserHeader from '@/components/header/UserHeader';
import CreateNominationBox from '@/components/nomination/CreateNominationBox';
import StatsButtons from '@/components/nomination/StatsButtons';
import NominationCard from '@/components/nomination/NominationCard';

export default function DashboardPage() {
  return (
    <Box
      sx={{
        minHeight: '100dvh',
        height: { md: '100dvh' },
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F3F4F6',
      }}
    >
      <UserHeader />
      <Box
        sx={{
          flex: 1,
          display: 'grid',
          gap: 2,
          p: 2,
          overflow: 'hidden',
          gridTemplateColumns: {
            xs: '1fr',
            md: '2fr 1fr',
          },
        }}
      >
        {/* RIGHT PANEL (Create + Stats) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,

            /* 🔑 ORDER FIX */
            order: {
              xs: 1, // mobile → FIRST
              md: 2, // web → RIGHT
            },

            top: 0,
          }}
        >
          <CreateNominationBox />
          <StatsButtons />
        </Box>

        {/* LEFT PANEL (List) */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,

            order: {
              xs: 2, // mobile → BELOW create box
              md: 1, // web → LEFT
            },

            overflowY: {
              xs: 'visible',
              md: 'auto',
            },
            pr: 1,
          }}
        >
          <NominationCard />
          <NominationCard />
          <NominationCard />
          <NominationCard />
          <NominationCard />
        </Box>
      </Box>
    </Box>
  );
}
