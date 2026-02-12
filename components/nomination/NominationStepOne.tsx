'use client';

import {
  Box,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Paper,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Title1 from '@/components/Titel1';
import Text from '../FormComponents/Text';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import AppHeader from '../header/Appheader';
import NominationStepper from './NominationStepper';

const steps = ['1', '2', '3'];

function NominationStepOne() {
  const router = useRouter();
  const [activeStep] = useState(0);

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
        onBack={() => router.push('/dashboard')}
        h1={hi?.form?.nomi_details}
        h2={en?.form?.nomi_details}
      />
      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 2,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
          }}
        >
          <NominationStepper activeStep={0} />

          <Title1
            h1="नामांकित देवी का विवरण"
            h2="Nominee Details"
            h1style={{ fontSize: 18, fontWeight: 700 }}
            h2style={{ mb: 2, fontSize: 14 }}
          />

          <Box display="flex" flexDirection="column" gap={2}>
            <Text
              label_1={hi?.form?.name}
              label_2={en?.form?.name}
              placeholder="As per Aadhaar"
            />
            <Text
              label_1={hi?.form?.pincode}
              label_2={en?.form?.pincode}
              placeholder="As per Aadhaar"
            />
            <Text
              label_1={hi?.form?.dictrict}
              label_2={en?.form?.dictrict}
              placeholder="As per Aadhaar"
            />
            <Text
              label_1={hi?.form?.area}
              label_2={en?.form?.area}
              placeholder="As per Aadhaar"
            />
            <Text
              label_1={hi?.form?.permanent_address}
              label_2={en?.form?.permanent_address}
              placeholder="Street, Village, Block..."
              multiline
              rows={3}
            />
            <Text
              label_1={hi?.form?.adhaar}
              label_2={en?.form?.adhaar}
              placeholder="12-digit number"
            />
            <Text
              label_1={hi?.form?.pan}
              label_2={en?.form?.pan}
              placeholder="ABCDE1234F"
            />
            <Text label_1={hi?.form?.dob} label_2={en?.form?.dob} type="date" />
          </Box>

          {/* Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              py: 1.5,
              borderRadius: 2,
              bgcolor: '#000',
              textTransform: 'none',
              '&:hover': { bgcolor: '#111' },
            }}
          >
            <Box textAlign="center">
              <Typography fontWeight={600} fontSize={15}>
                अगला चरण
              </Typography>
              <Typography fontSize={12}>Next Step</Typography>
            </Box>
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default NominationStepOne;
