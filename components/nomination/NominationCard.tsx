'use client';

import { Box, Typography, Paper, Button, SxProps, Theme } from '@mui/material';
import { useRouter } from 'next/navigation';
import Title1 from '../Titel1';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type NominationData = {
  name: string;
  id: string;
  amount: number;
  type: string;
};

type cardValue = {
  data: NominationData;
  cardSx?: SxProps<Theme>;
  approvedSx?: SxProps<Theme>;
  canReview: boolean;
  notshowapproved?: boolean;
  form_approve?: boolean;
};
function NominationCard({
  data,
  canReview,
  cardSx,
  approvedSx,
  notshowapproved,
  form_approve,
}: cardValue) {
  const router = useRouter();
  const openViewForm = () => {
    if (form_approve) {
      return;
    } else if (canReview) {
      router.push('/nomination_form/view_form?view=false');
    } else {
      router.push('/nomination_form/view_form?view=true');
    }
  };
  return (
    <Paper
      onClick={openViewForm}
      elevation={2}
      sx={{
        p: 1.5,
        borderRadius: 2,
        borderLeft: '4px solid',
        borderColor: '#000',
        ...cardSx,
      }}
    >
      <Title1
        h1={data.name}
        h2={`ID: ${data.id}`}
        h1style={{ fontSize: '1rem', fontWeight: 600 }}
        h2style={{
          fontWeight: 400,
          mb: 0.5,
          fontSize: '0.75rem',
          color: '#6B7280',
        }}
      />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 0.5 }}
      >
        <Title1
          h1={hi?.dashboard?.credit_limit}
          h2={en?.dashboard?.credit_limit}
          h1style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6B7280' }}
          h2style={{ fontWeight: 400, fontSize: '0.65rem', color: '#6B7280' }}
        />
        <Typography fontWeight={600} sx={{ fontSize: '0.9rem' }}>
          ₹{data.amount}
        </Typography>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 0.5 }}
      >
        <Title1
          h1={hi?.dashboard?.ent_type}
          h2={en?.dashboard?.ent_type}
          h1style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6B7280' }}
          h2style={{ fontWeight: 400, fontSize: '0.65rem', color: '#6B7280' }}
        />
        <Typography sx={{ fontSize: '0.9rem' }} fontWeight={600}>
          {data.type}
        </Typography>
      </Box>

      {!notshowapproved && (
        <Box
          sx={{
            display: 'flex',
            gap: 0.5,
            alignItems: 'center',
            mt: 1,
            p: 1,
            borderRadius: '10px',
            ...approvedSx,
          }}
        >
          <CheckCircleIcon sx={{ fontSize: 14 }} />
          <Typography sx={{ fontSize: '0.6rem', color: '#374151' }}>
            Approved by XYZ
          </Typography>
          <Typography
            sx={{ fontSize: '0.6rem', fontWeight: 600, color: '#111827' }}
          >
            Maker group members
          </Typography>
          <Typography sx={{ fontSize: '0.6rem', color: '#374151' }}>
            on 11 Jan, 3:15 PM
          </Typography>
        </Box>
      )}

      {canReview && (
        <Box sx={{ mt: 1 }}>
          <Button
            fullWidth
            sx={{
              backgroundColor: '#000',
              color: '#fff',
              borderRadius: 2,
              py: 1,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#333',
              },
            }}
            onClick={openViewForm}
          >
            <Title1
              h1={hi?.dashboard?.review}
              h2={en?.dashboard?.review}
              h1style={{
                fontWeight: 600,
                fontSize: '0.8rem',
              }}
              h2style={{
                fontWeight: 400,
                fontSize: '0.7rem',
              }}
            />
          </Button>
        </Box>
      )}
    </Paper>
  );
}

export default NominationCard;
