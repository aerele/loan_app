'use client';

import { Box, Button, Paper } from '@mui/material';
import Title1 from '../Titel1';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import { redirect } from 'next/navigation';

function CreateNominationBox() {
  const openNominationForm = () => {
    redirect('/nomination_form/step-1');
  };
  return (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        borderRadius: 2,
        backgroundColor: 'white',
      }}
    >
      <Title1
        h1={hi?.dashboard?.nomi_new}
        h2={en?.dashboard?.nomi_new}
        h1style={{ fontSize: '1.1rem', fontWeight: 600 }}
        h2style={{ fontWeight: 400, fontSize: '0.8rem', mb: 1 }}
      />
      <Button
        fullWidth
        onClick={openNominationForm}
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
          h1={hi?.dashboard?.create_nomination}
          h2={en?.dashboard?.create_nomination}
          h1style={{
            fontWeight: 600,
            fontSize: '0.9rem',
          }}
          h2style={{
            fontWeight: 400,
            fontSize: '0.75rem',
          }}
        />
      </Button>
    </Paper>
  );
}
export default CreateNominationBox;
