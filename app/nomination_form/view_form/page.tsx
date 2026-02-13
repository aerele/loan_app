'use client';

import { Box, Paper, Button } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, ReactNode } from 'react';
import AppHeader from '@/components/header/Appheader';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import Title1 from '@/components/Titel1';
import SelectField from '@/components/FormComponents/SelectField';

type SectionProps = {
  titleHi: string;
  titleEn: string;
  children: ReactNode;
};

function Section({ titleHi, titleEn, children }: SectionProps) {
  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Title1
        h1={titleHi}
        h2={titleEn}
        boxStyle={{ pb: 2 }}
        h1style={{ fontSize: 16, fontWeight: 700 }}
        h2style={{ fontWeight: 300, fontSize: 13 }}
      />
      {children}
    </Paper>
  );
}

function ViewForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const view = searchParams.get('view') === 'true';
  const [creditLimit, setCreditLimit] = useState('');

  const nomi_details = [
    { h1: 'Full Name', h2: 'Sunita Devi' },
    { h1: 'Aadhaar Number', h2: 'XXXX-XXXX-4432' },
    { h1: 'PAN Number', h2: 'MBNPSXXXXX' },
    { h1: 'Date of Birth', h2: '10-07-2000' },
    { h1: 'Pincode', h2: '842001' },
    { h1: 'District', h2: 'Muzaffarpur' },
    { h1: 'Town / Village', h2: 'MBNPSXXXXX' },
    { h1: 'Permanent Address', h2: 'Ward 12, Muzaffarpur, Bihar - 842001' },
  ];
  const enterpricess_details = [
    { h1: 'Sector Type', h2: 'Non-Farm' },
    { h1: 'Enterprise Type', h2: 'Tailoring' },
    { h1: 'Support Needed', h2: 'Market Access, Marketing' },
  ];

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: '#F3F4F6',
      }}
    >
      <AppHeader
        showBack
        onBack={() => router.back()}
        h1={hi?.form?.nomi_form}
        h2={en?.form?.nomi_form}
      />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <Box display="flex" justifyContent="space-between">
            <Box>
              <Title1
                h1="Sunita Devi"
                h2="ID: SHG-123"
                h1style={{ fontSize: 14, fontWeight: 600 }}
                h2style={{ fontWeight: 300, fontSize: 13 }}
              />
            </Box>

            <Box textAlign="right">
              <Title1
                h1="SHG Proposed"
                h2="₹25,000"
                h1style={{ fontSize: 14, fontWeight: 600 }}
                h2style={{ fontWeight: 300, fontSize: 13 }}
              />
            </Box>
          </Box>
        </Paper>

        <Section
          titleHi={hi?.nomi_form?.nomniee_title}
          titleEn={en?.nomi_form?.nomniee_title}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
            }}
          >
            {nomi_details.map((item, index) => (
              <Title1
                key={index}
                h1={item.h1}
                h2={item.h2}
                h1style={{ fontSize: 13, fontWeight: 300 }}
                h2style={{ fontWeight: 600, fontSize: 14 }}
              />
            ))}
          </Box>
        </Section>

        <Section
          titleHi={hi?.nomi_form?.enterprises_title}
          titleEn={en?.nomi_form?.enterprises_title}
        >
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 2,
            }}
          >
            {enterpricess_details.map((item, index) => (
              <Box
                key={index}
                sx={{
                  gridColumn:
                    index === enterpricess_details.length - 1 &&
                    enterpricess_details.length % 2 === 1
                      ? '1 / -1'
                      : 'auto',
                }}
              >
                <Title1
                  key={index}
                  h1={item.h1}
                  h2={item.h2}
                  h1style={{ fontSize: 13, fontWeight: 300 }}
                  h2style={{ fontWeight: 600, fontSize: 14 }}
                />
              </Box>
            ))}
          </Box>
        </Section>

        <Section
          titleHi={hi?.nomi_form?.credit_bureau}
          titleEn={en?.nomi_form?.credit_bureau}
        >
          <Paper
            sx={{
              p: 2,
              borderRadius: 2,
              border: '1px solid #E5E7EB',
              bgcolor: '#F9FAFB',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Box>
              <Title1
                h1="Credit Score"
                h2="742"
                h1style={{ fontSize: 14, fontWeight: 400 }}
                h2style={{ fontWeight: 600, fontSize: 18 }}
              />
            </Box>

            <Box
              sx={{
                bgcolor: '#000',
                color: '#fff',
                px: 1.5,
                py: 0.5,
                borderRadius: 3,
                fontSize: 12,
              }}
            >
              मध्यम
            </Box>
          </Paper>
        </Section>
        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <SelectField
            label_1={hi?.credit_score?.set_credit_limit}
            label_2={en?.credit_score?.set_credit_limit}
            placeholder="Set Credit Limit"
            value={creditLimit}
            onChange={setCreditLimit}
            view={view}
            options={[
              {
                label_1: '50000',
                value: '50000',
              },
              {
                label_1: '100000',
                value: '100000',
              },
              {
                label_1: '150000',
                value: '150000',
              },
              {
                label_1: '200000',
                value: '200000',
              },
              {
                label_1: '250000',
                value: '250000',
              },
              {
                label_1: '300000',
                value: '300000',
              },
            ]}
          />
        </Paper>
        {!view && (
          <Button
            fullWidth
            variant="contained"
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 3,
              bgcolor: '#000',
              textTransform: 'none',
            }}
          >
            <Box textAlign="center">
              <Title1
                h1={hi?.form?.approved}
                h2={en?.form?.approved}
                h1style={{
                  fontWeight: 600,
                  fontSize: '0.8rem',
                }}
                h2style={{
                  fontWeight: 400,
                  fontSize: '0.7rem',
                }}
              />
            </Box>
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default ViewForm;
