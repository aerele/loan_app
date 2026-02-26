'use client';

import { Box, Button, Paper } from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Title1 from '@/components/Titel1';
import Text from '@/components/FormComponents/Text';
import hi from '@/messages/hi.json';
import en from '@/messages/en.json';
import { addToast } from '@/components/error/toastStore';
import AppHeader from '@/components/header/Appheader';
import { validatAadhar, validatPan } from '@/services/api';
import NominationStepper from '@/components/nomination/NominationStepper';
import { useNominationForm } from '../NominationFormProvider';

type Step1 = {
  first_name: string;
  last_name: string;
  pincode: string;
  district: string;
  area: string;
  permanent_address: string;
  aadhaar: string;
  pan: string;
  dob: string;
};

export default function NominationStepOne() {
  const router = useRouter();
  const { form, setStep1 } = useNominationForm();

  const [aadhaarValidated, setAadhaarValidated] = useState(false);
  const [panValidated, setPanValidated] = useState(false);

  const [nextLoading, setNextLoading] = useState(false);

  const isEmpty = (v: unknown) => String(v ?? '').trim().length === 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    const key = name as keyof Step1;

    if (key === 'aadhaar') setAadhaarValidated(false);
    if (key === 'pan') setPanValidated(false);

    setStep1({ [key]: value } as Partial<Step1>);
  };

  const validateAadhaar = async (): Promise<boolean> => {
    try {
      const aadhaar = (form.step1.aadhaar || '').trim();

      if (!aadhaar) {
        addToast({
          type: 'error',
          hi: 'कृपया आधार नंबर दर्ज करें',
          en: 'Please enter Aadhaar number',
        });
        setAadhaarValidated(false);
        return false;
      }

      const res = await validatAadhar(aadhaar);
      const isValid = Boolean(res?.message?.status);

      setAadhaarValidated(isValid);

      addToast({
        type: isValid ? 'success' : 'error',
        hi: isValid ? 'आधार सत्यापन सफल' : 'आधार सत्यापन असफल',
        en: isValid
          ? 'Aadhaar validated successfully'
          : 'Aadhaar validation failed',
      });

      return isValid;
    } catch {
      setAadhaarValidated(false);
      addToast({
        type: 'error',
        hi: 'आधार सत्यापन असफल',
        en: 'Aadhaar validation failed',
      });
      return false;
    }
  };

  const validatePan = async (): Promise<boolean> => {
    try {
      const pan = (form.step1.pan || '').trim().toUpperCase();

      if (!pan) {
        addToast({
          type: 'error',
          hi: 'कृपया पैन नंबर दर्ज करें',
          en: 'Please enter PAN number',
        });
        setPanValidated(false);
        return false;
      }

      const res = await validatPan(pan);
      const isValid = Boolean(res?.message?.status);

      setPanValidated(isValid);

      addToast({
        type: isValid ? 'success' : 'error',
        hi: isValid ? 'पैन सत्यापन सफल' : 'पैन सत्यापन असफल',
        en: isValid ? 'PAN validated successfully' : 'PAN validation failed',
      });

      return isValid;
    } catch {
      setPanValidated(false);
      addToast({
        type: 'error',
        hi: 'पैन सत्यापन असफल',
        en: 'PAN validation failed',
      });
      return false;
    }
  };

  const validateRequired = (): boolean => {
    if (isEmpty(form.step1.first_name)) {
      addToast({
        type: 'error',
        hi: 'पहला नाम आवश्यक है',
        en: 'First name is required',
      });
      return false;
    }
    if (isEmpty(form.step1.last_name)) {
      addToast({
        type: 'error',
        hi: 'अंतिम नाम आवश्यक है',
        en: 'Last name is required',
      });
      return false;
    }
    if (isEmpty(form.step1.pincode)) {
      addToast({
        type: 'error',
        hi: 'पिनकोड आवश्यक है',
        en: 'Pincode is required',
      });
      return false;
    }
    if (isEmpty(form.step1.aadhaar)) {
      addToast({
        type: 'error',
        hi: 'आधार नंबर आवश्यक है',
        en: 'Aadhaar is required',
      });
      return false;
    }
    if (isEmpty(form.step1.pan)) {
      addToast({
        type: 'error',
        hi: 'पैन नंबर आवश्यक है',
        en: 'PAN is required',
      });
      return false;
    }
    if (isEmpty(form.step1.dob)) {
      addToast({
        type: 'error',
        hi: 'जन्म तिथि आवश्यक है',
        en: 'Date of Birth is required',
      });
      return false;
    }
    return true;
  };

  const handleNext = async () => {
    if (nextLoading) return;

    const okRequired = validateRequired();
    if (!okRequired) return;

    try {
      setNextLoading(true);

      let aOk = aadhaarValidated;
      let pOk = panValidated;

      if (!aOk) aOk = await validateAadhaar();
      if (!pOk) pOk = await validatePan();

      if (!aOk || !pOk) {
        return;
      }

      addToast({
        type: 'success',
        hi: 'पहला चरण सफलतापूर्वक पूरा हुआ',
        en: 'Step 1 completed successfully',
      });

      router.push('/nomination_form/step-2');
    } finally {
      setNextLoading(false);
    }
  };

  const canClickNext =
    !isEmpty(form.step1.first_name) &&
    !isEmpty(form.step1.last_name) &&
    !isEmpty(form.step1.pincode) &&
    !isEmpty(form.step1.aadhaar) &&
    !isEmpty(form.step1.pan) &&
    !isEmpty(form.step1.dob) &&
    !nextLoading;

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
        h1={hi?.form?.nomi_form}
        h2={en?.form?.nomi_form}
      />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2,
          py: 2,
          pb: 5,
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 3 }}>
          <NominationStepper activeStep={0} />

          <Title1
            h1={hi?.form?.nomi_details}
            h2={en?.form?.nomi_details}
            h1style={{ fontSize: 18, fontWeight: 700 }}
            h2style={{ mb: 2, fontSize: 14 }}
          />

          <Box display="flex" flexDirection="column" gap={2}>
            <Text
              name="first_name"
              value={form.step1.first_name}
              onChange={handleChange}
              label_1={hi?.form?.first_name}
              label_2={en?.form?.first_name}
              placeholder="As per Aadhaar"
              required
            />

            <Text
              name="last_name"
              value={form.step1.last_name}
              onChange={handleChange}
              label_1={hi?.form?.last_name}
              label_2={en?.form?.last_name}
              placeholder="As per Aadhaar"
              required
            />

            <Text
              name="pincode"
              value={form.step1.pincode}
              onChange={handleChange}
              label_1={hi?.form?.pincode}
              label_2={en?.form?.pincode}
              placeholder="Pincode"
              required
            />

            {/* Optional fields ✅ */}
            <Text
              name="district"
              value={form.step1.district}
              onChange={handleChange}
              label_1={hi?.form?.dictrict}
              label_2={en?.form?.dictrict}
              placeholder="District"
            />

            <Text
              name="area"
              value={form.step1.area}
              onChange={handleChange}
              label_1={hi?.form?.area}
              label_2={en?.form?.area}
              placeholder="Area"
            />

            <Text
              name="permanent_address"
              value={form.step1.permanent_address}
              onChange={handleChange}
              label_1={hi?.form?.permanent_address}
              label_2={en?.form?.permanent_address}
              placeholder="Street, Village, Block..."
              multiline
              rows={3}
            />

            <Text
              name="aadhaar"
              value={form.step1.aadhaar}
              onChange={handleChange}
              label_1={hi?.form?.adhaar}
              label_2={en?.form?.adhaar}
              placeholder="12-digit number"
              required
              validate
              validated={aadhaarValidated}
              onValidateClick={validateAadhaar}
            />

            <Text
              name="pan"
              value={form.step1.pan}
              onChange={handleChange}
              label_1={hi?.form?.pan}
              label_2={en?.form?.pan}
              placeholder="ABCDE1234F"
              required
              validate
              validated={panValidated}
              onValidateClick={validatePan}
            />

            <Text
              name="dob"
              value={form.step1.dob}
              onChange={handleChange}
              label_1={hi?.form?.dob}
              label_2={en?.form?.dob}
              type="date"
              required
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
            onClick={handleNext}
            disabled={!canClickNext}
          >
            <Box textAlign="center">
              <Title1
                h1={hi?.form?.next_step}
                h2={en?.form?.next_step}
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
