'use client';

import { Box, Paper, Button } from '@mui/material';
import { useRouter } from 'next/navigation';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import AppHeader from '@/components/header/Appheader';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import Title1 from '@/components/Titel1';
import SelectField from '@/components/FormComponents/SelectField';
import { getDoc } from '@/services/api';

type FormValues = Record<string, unknown>;

const s = (v: unknown, fallback = ''): string =>
  typeof v === 'string' ? v : fallback;

const n = (v: unknown, fallback = 0): number => {
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const parsed = Number(v);
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
};

const getScoreColor = (score: number): string => {
  if (score < 681) return '#737373';
  if (score <= 770) return '#A3A3A3';
  if (score <= 790) return '#737373';
  return '#525252';
};

type ScoreBandKey = 'needs_help' | 'average' | 'fair' | 'good' | 'excellent';

const getScoreBandKey = (score: number): ScoreBandKey => {
  if (score < 681) return 'needs_help';
  if (score <= 730) return 'average';
  if (score <= 770) return 'fair';
  if (score <= 790) return 'good';
  return 'excellent';
};

type ScoreLegendRow = { r: string; t: string };

const buildScoreLegend = (lang: 'hi' | 'en'): ScoreLegendRow[] => {
  const dict = lang === 'hi' ? hi : en;

  return lang === 'hi'
    ? [
        {
          r: `681 ${s(dict?.credit_score?.below)}`,
          t: s(dict?.credit_score?.needs_help),
        },
        { r: '681 - 730', t: s(dict?.credit_score?.average) },
        { r: '731 - 770', t: s(dict?.credit_score?.fair) },
        { r: '771 - 790', t: s(dict?.credit_score?.good) },
        {
          r: `790 ${s(dict?.credit_score?.above)}`,
          t: s(dict?.credit_score?.excellent),
        },
      ]
    : [
        {
          r: `${s(dict?.credit_score?.below)} 681`,
          t: s(dict?.credit_score?.needs_help),
        },
        { r: '681 - 730', t: s(dict?.credit_score?.average) },
        { r: '731 - 770', t: s(dict?.credit_score?.fair) },
        { r: '771 - 790', t: s(dict?.credit_score?.good) },
        {
          r: `${s(dict?.credit_score?.above)} 790`,
          t: s(dict?.credit_score?.excellent),
        },
      ];
};

type SectionProps = {
  titleHi?: unknown;
  titleEn?: unknown;
  children: ReactNode;
};

function Section({ titleHi, titleEn, children }: SectionProps) {
  return (
    <Paper sx={{ p: 2, borderRadius: 3 }}>
      <Title1
        h1={s(titleHi)}
        h2={s(titleEn)}
        boxStyle={{ pb: 2 }}
        h1style={{ fontSize: 16, fontWeight: 700 }}
        h2style={{ fontWeight: 300, fontSize: 13 }}
      />
      {children}
    </Paper>
  );
}

type FormControlProps = {
  view: boolean;
  name?: string;
};

export default function ViewFormContent({ view, name }: FormControlProps) {
  const router = useRouter();

  const [creditLimit, setCreditLimit] = useState('');
  const [formValues, setFormValues] = useState<FormValues | null>(null);

  useEffect(() => {
    if (!name) return;

    const getFormData = async () => {
      const res = await getDoc(name);
      const first: unknown = res?.message?.msg?.[0];

      const item: FormValues | null =
        first && typeof first === 'object' && !Array.isArray(first)
          ? (first as FormValues)
          : null;

      setFormValues(item);

      const serverLimit = s(item?.set_credit_limit);
      if (serverLimit) setCreditLimit(serverLimit);
    };

    getFormData();
  }, [name]);

  const firstName = s(formValues?.first_name);
  const lastName = s(formValues?.last_name);
  const fullName = `${firstName} ${lastName}`.trim() || 'guest';

  const docId = s(formValues?.name, '—');
  const workflowState = s(formValues?.workflow_state, '—');

  const sectorType =
    n(formValues?.farm_based, 0) === 1
      ? 'Farm'
      : n(formValues?.non_farm, 0) === 1
        ? 'Non-Farm'
        : n(formValues?.none, 0) === 1
          ? 'None'
          : 'Agriculture';

  const supportNeeded = useMemo(() => {
    const out: string[] = [];
    if (n(formValues?.market_access, 0) === 1) out.push('Market Access');
    if (n(formValues?.marketing, 0) === 1) out.push('Marketing');
    return out.join(', ') || '-';
  }, [formValues]);

  const enterpriseType = s(formValues?.business_category, 'Agriculture');

  const creditScore = n(formValues?.credit_score, 0);
  const scoreColor = getScoreColor(creditScore);
  const scoreBandKey = getScoreBandKey(creditScore);

  const legendLang: 'hi' | 'en' = 'hi';
  const legendRows = buildScoreLegend(legendLang);

  const scoreLabel =
    legendLang === 'hi'
      ? s(hi?.credit_score?.[scoreBandKey], '')
      : s(en?.credit_score?.[scoreBandKey], '');

  const nomi_details = [
    { h1: 'Full Name', h2: fullName || '-' },
    { h1: 'Aadhaar Number', h2: s(formValues?.aadhaar_number, '-') },
    { h1: 'PAN Number', h2: s(formValues?.pan_number, '-') },
    { h1: 'Date of Birth', h2: s(formValues?.date_of_birth, '-') },
    { h1: 'Pincode', h2: s(formValues?.pincode, '-') },
    { h1: 'District', h2: s(formValues?.district, '-') },
    { h1: 'Town / Village', h2: s(formValues?.townvillage, '-') },
    { h1: 'Permanent Address', h2: s(formValues?.permanent_address, '-') },
  ];

  const enterpricess_details = [
    { h1: 'Sector Type', h2: sectorType || '-' },
    { h1: 'Enterprise Type', h2: enterpriseType || '-' },
    { h1: 'Support Needed', h2: supportNeeded || '-' },
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
        h1={s(hi?.form?.nomi_form)}
        h2={s(en?.form?.nomi_form)}
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
                h1={fullName}
                h2={`ID: ${docId}`}
                h1style={{ fontSize: 14, fontWeight: 600 }}
                h2style={{ fontWeight: 300, fontSize: 13 }}
              />
            </Box>

            <Box textAlign="right">
              <Title1
                h1={workflowState || '—'}
                h2={`₹${creditLimit || s(formValues?.set_credit_limit, '0')}`}
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
                h2={item.h2 || '-'}
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
                  h1={item.h1}
                  h2={item.h2 || '-'}
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
                h2={String(creditScore)}
                h1style={{ fontSize: 14, fontWeight: 400 }}
                h2style={{ fontWeight: 600, fontSize: 18 }}
              />
            </Box>

            <Box
              sx={{
                bgcolor: scoreColor,
                color: '#fff',
                px: 1.5,
                py: 0.5,
                borderRadius: 3,
                fontSize: 12,
              }}
            >
              {scoreLabel || '-'}
            </Box>
          </Paper>
        </Section>

        <Paper sx={{ p: 2, borderRadius: 3 }}>
          <SelectField
            label_1={s(hi?.credit_score?.set_credit_limit)}
            label_2={s(en?.credit_score?.set_credit_limit)}
            placeholder="Set Credit Limit"
            value={creditLimit || s(formValues?.set_credit_limit, '50000')}
            onChange={setCreditLimit}
            view={view}
            options={[
              { label_1: '50000', value: '50000' },
              { label_1: '100000', value: '100000' },
              { label_1: '150000', value: '150000' },
              { label_1: '200000', value: '200000' },
              { label_1: '250000', value: '250000' },
              { label_1: '300000', value: '300000' },
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
                h1={s(hi?.form?.approved)}
                h2={s(en?.form?.approved)}
                h1style={{ fontWeight: 600, fontSize: '0.8rem' }}
                h2style={{ fontWeight: 400, fontSize: '0.7rem' }}
              />
            </Box>
          </Button>
        )}
      </Box>
    </Box>
  );
}
