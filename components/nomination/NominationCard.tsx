'use client';

import { Box, Typography, Paper, Button } from '@mui/material';
import Title1 from '../Titel1';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

type cardValue = {
  name: string;
  id: string;
  amount: number;
  type: string;
  canReview: boolean;
};
function NominationCard({ name, id = '', amount, type, canReview }: cardValue) {
  return (
    <Paper
      sx={{
        p: 1.5,
        borderRadius: 2,
        borderLeft: '4px solid #000',
      }}
    >
      <Title1
        h1={name}
        h2={`ID: ${id}`}
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
          ₹{amount}
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
          {type}
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mt: 1 }}>
        <CheckCircleIcon sx={{ fontSize: 14 }} />
        <Typography sx={{ fontSize: '0.7rem', color: '#374151' }}>
          Approved by XYZ
        </Typography>
        <Typography
          sx={{ fontSize: '0.7rem', fontWeight: 600, color: '#111827' }}
        >
          Maker group members
        </Typography>
      </Box>

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
