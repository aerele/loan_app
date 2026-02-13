'use client';

import { Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import AppHeader from '@/components/header/Appheader';
import Title1 from '@/components/Titel1';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import NominationCard from '@/components/nomination/NominationCard';
import NextTimeline from '@/components/nomination/NextTimeline';

function ViewStatus() {
  const router = useRouter();
  const [approved] = useState({
    name: 'Ravi',
    id: 'ID-001',
    amount: 5000,
    type: 'Type 1',
  });
  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F3F4F6',
        overflow: 'hidden',
      }}
    >
      <AppHeader
        showBack
        onBack={() => router.push('/nomination_form/step-2')}
        h1={hi?.form?.nomi_form}
        h2={en?.form?.nomi_form}
      />
      <Box sx={{ p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CheckCircleIcon sx={{ fontSize: '5rem', color: '#6B7280' }} />
          <Title1
            h1={hi?.form?.nomi_approved}
            h2={en?.form?.nomi_approved}
            boxStyle={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              mt: 1,
            }}
            h1style={{
              fontSize: 22,
            }}
            h2style={{
              fontSize: 20,
            }}
          />
        </Box>

        <Box sx={{ mt: 2 }}>
          <NominationCard
            key={approved?.id}
            data={approved}
            canReview={false}
            notshowapproved={true}
          />
        </Box>

        <Box sx={{ p: 0.5, mt: 2 }}>
          <Title1
            h1={hi?.credit_score?.next}
            h2={en?.credit_score?.next}
            h1style={{ fontSize: 20, fontWeight: 700 }}
            h2style={{ mb: 2, fontSize: 16 }}
          />
        </Box>

        <Box>
          <NextTimeline
            steps={[
              {
                title: 'SHG Review - Maker',
                subtitle: 'Reviewed by XYZ SHG',
                active: true,
              },
              {
                title: 'VO Approval - Checker 1',
                subtitle: 'Village Organization reviews the nomination.',
                active: true,
              },
              {
                title: 'CLF Approval',
                subtitle: 'Final credit limit set and disbursement starts.',
                active: false,
              },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default ViewStatus;
