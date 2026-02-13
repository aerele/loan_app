'use client';

import { Box, Button, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Title1 from '@/components/Titel1';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import AppHeader from '@/components/header/Appheader';
import CheckBoxSingleSelect from '@/components/FormComponents/CheckBoxSingleSelect';
import NominationStepper from '@/components/nomination/NominationStepper';
import SelectField from '@/components/FormComponents/SelectField';
import CheckBoxMultiSelect from '@/components/FormComponents/CheckBoxMultiSelect';
import ImportantNote from '@/components/nomination/ImportantNote';

function NominationStepOne() {
  const router = useRouter();
  const [activeStep] = useState(0);
  const [sector, setSector] = useState('farm');
  const [businessType, setBusinessType] = useState('');
  const [supportNeeded, setSupportNeeded] = useState<string[]>([]);

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
        onBack={() => router.push('/nomination_form/step-1')}
        h1={hi?.form?.nomi_form}
        h2={en?.form?.nomi_form}
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
          <NominationStepper activeStep={1} />

          <Title1
            h1={hi?.form?.enterprise}
            h2={en?.form?.enterprise}
            h1style={{ fontSize: 18, fontWeight: 700 }}
            h2style={{ mb: 2, fontSize: 14 }}
          />

          <Box display="flex" flexDirection="column" gap={2}>
            <CheckBoxSingleSelect
              label_1={hi?.form?.sector_type}
              label_2={en?.form?.sector_type}
              value={sector}
              onChange={setSector}
              options={[
                {
                  label_1: 'कृषि आधारित',
                  label_2: 'Farm-based',
                  value: 'farm',
                },
                {
                  label_1: 'गैर-कृषि आधारित',
                  label_2: 'Non-farm',
                  value: 'nonfarm',
                },
              ]}
            />
            <SelectField
              label_1={hi?.form?.business_type}
              label_2={en?.form?.business_type}
              placeholder="Select Farm-based enterprises"
              value={businessType}
              onChange={setBusinessType}
              options={[
                {
                  label_1: 'कृषि',
                  label_2: 'Agriculture',
                  value: 'agri',
                },
                {
                  label_1: 'डेयरी',
                  label_2: 'Dairy',
                  value: 'dairy',
                },
                {
                  label_1: 'बकरी पालन',
                  label_2: 'Goat rearing',
                  value: 'goat',
                },
              ]}
            />

            <CheckBoxMultiSelect
              label_1={hi?.form?.support}
              label_2={en?.form?.support}
              value={supportNeeded}
              onChange={setSupportNeeded}
              options={[
                {
                  label_1: 'बाजार तक पहुंच',
                  label_2: 'Market Access',
                  value: 'market',
                },
                {
                  label_1: 'विपणन',
                  label_2: 'Marketing',
                  value: 'marketing',
                },
                {
                  label_1: 'मांग का आकलन',
                  label_2: 'Demand Assessment',
                  value: 'demand',
                },
                {
                  label_1: 'कोई नहीं',
                  label_2: 'None',
                  value: 'none',
                },
              ]}
            />

            <ImportantNote
              h1={hi.form.important_form}
              h2={en.form.important_form}
              desc_1={hi.form.final_review_desc_form}
              desc_2={en.form.final_review_desc_form}
            />
          </Box>

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
            onClick={() => router.push('/nomination_form/step-3')}
          >
            <Box textAlign="center">
              <Title1
                h1={hi?.form?.next_step}
                h2={en?.form?.save_and_next}
                h1style={{
                  fontWeight: 600,
                  textAlign: 'center',
                  fontSize: 15,
                }}
                h2style={{
                  fontWeight: 400,
                  fontSize: 12,
                  textAlign: 'center',
                }}
              />
            </Box>
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}

export default NominationStepOne;
