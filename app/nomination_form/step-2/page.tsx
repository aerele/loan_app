'use client';

import { Box, Button, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import Title1 from '@/components/Titel1';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import AppHeader from '@/components/header/Appheader';
import CheckBoxSingleSelect from '@/components/FormComponents/CheckBoxSingleSelect';
import NominationStepper from '@/components/nomination/NominationStepper';
import SelectField from '@/components/FormComponents/SelectField';
import CheckBoxMultiSelect from '@/components/FormComponents/CheckBoxMultiSelect';
import ImportantNote from '@/components/nomination/ImportantNote';
import { useNominationForm } from '../NominationFormProvider';
import { addToast } from '@/components/error/toastStore';

type Sector = 'farm' | 'nonfarm';

export default function NominationStepTwoPage() {
  const router = useRouter();
  const { form, setStep2 } = useNominationForm();

  const { sector, businessType, supportNeeded } = form.step2;

  const validateRequired = (): boolean => {
    if (!sector) {
      addToast({
        type: 'error',
        hi: 'कृपया सेक्टर चुनें',
        en: 'Please select sector',
      });
      return false;
    }

    if (!businessType) {
      addToast({
        type: 'error',
        hi: 'कृपया बिज़नेस टाइप चुनें',
        en: 'Please select business type',
      });
      return false;
    }

    if (!supportNeeded || supportNeeded.length === 0) {
      addToast({
        type: 'error',
        hi: 'कृपया सपोर्ट विकल्प चुनें',
        en: 'Please select support needed',
      });
      return false;
    }

    return true;
  };

  const handleNext = () => {
    const ok = validateRequired();
    if (!ok) return;

    addToast({
      type: 'success',
      hi: 'दूसरा चरण सफलतापूर्वक पूरा हुआ',
      en: 'Step 2 completed successfully',
    });

    router.push('/nomination_form/step-3');
  };

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
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 3 }}>
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
              onChange={(val) => {
                setStep2({ sector: val as Sector, businessType: '' });
              }}
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
              placeholder={
                sector === 'farm'
                  ? 'Select Farm-based enterprises'
                  : 'Select Non-farm enterprises'
              }
              value={businessType}
              onChange={(val) => setStep2({ businessType: val })}
              options={
                sector === 'farm'
                  ? [
                      {
                        label_1: 'कृषि',
                        label_2: 'Agriculture',
                        value: 'agri',
                      },
                      { label_1: 'डेयरी', label_2: 'Dairy', value: 'dairy' },
                      {
                        label_1: 'बकरी पालन',
                        label_2: 'Goat rearing',
                        value: 'goat',
                      },
                    ]
                  : [
                      {
                        label_1: 'हस्तशिल्प',
                        label_2: 'Handicraft',
                        value: 'handicraft',
                      },
                      {
                        label_1: 'सिलाई',
                        label_2: 'Tailoring',
                        value: 'tailoring',
                      },
                    ]
              }
            />

            <CheckBoxMultiSelect
              label_1={hi?.form?.support}
              label_2={en?.form?.support}
              value={supportNeeded}
              onChange={(vals) => setStep2({ supportNeeded: vals })}
              options={[
                {
                  label_1: 'बाजार तक पहुंच',
                  label_2: 'Market Access',
                  value: 'market',
                },
                { label_1: 'विपणन', label_2: 'Marketing', value: 'marketing' },
                {
                  label_1: 'मांग का आकलन',
                  label_2: 'Demand Assessment',
                  value: 'demand',
                },
                { label_1: 'कोई नहीं', label_2: 'None', value: 'none' },
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
            // onClick={handleNext}
          >
            <Box textAlign="center">
              <Title1
                h1={hi?.form?.next_step}
                h2={en?.form?.save_and_next}
                h1style={{ fontWeight: 600, textAlign: 'center', fontSize: 15 }}
                h2style={{ fontWeight: 400, fontSize: 12, textAlign: 'center' }}
              />
            </Box>
          </Button>
        </Paper>
      </Box>
    </Box>
  );
}
