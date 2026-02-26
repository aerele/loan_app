'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { submitNominationForm } from '@/services/api';

export type NominationStep1Form = {
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

export type NominationStep2Form = {
  sector: 'farm' | 'nonfarm';
  businessType: string;
  supportNeeded: string[];
};

export type NominationStep3Form = {
  credit_score: string;
  credit_limit: string;
};

type NominationFormState = {
  step1: NominationStep1Form;
  step2: NominationStep2Form;
  step3: NominationStep3Form;
};

export type NominationSubmitPayload = NominationStep1Form &
  NominationStep2Form &
  NominationStep3Form;

const initialState: NominationFormState = {
  step1: {
    first_name: '',
    last_name: '',
    pincode: '',
    district: '',
    area: '',
    permanent_address: '',
    aadhaar: '',
    pan: '',
    dob: '',
  },
  step2: {
    sector: 'farm',
    businessType: '',
    supportNeeded: [],
  },
  step3: {
    credit_score: '',
    credit_limit: '',
  },
};

type SubmitResult = { ok: true } | { ok: false; error: string };

type Ctx = {
  form: NominationFormState;

  setStep1: (patch: Partial<NominationStep1Form>) => void;
  setStep2: (patch: Partial<NominationStep2Form>) => void;
  setStep3: (patch: Partial<NominationStep3Form>) => void;

  resetAll: () => void;

  submitForm: () => Promise<SubmitResult>;
};

const NominationFormContext = createContext<Ctx | null>(null);

export function NominationFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [form, setForm] = useState<NominationFormState>(initialState);

  const setStep1 = useCallback((patch: Partial<NominationStep1Form>) => {
    setForm((prev) => ({ ...prev, step1: { ...prev.step1, ...patch } }));
  }, []);

  const setStep2 = useCallback((patch: Partial<NominationStep2Form>) => {
    setForm((prev) => ({ ...prev, step2: { ...prev.step2, ...patch } }));
  }, []);

  const setStep3 = useCallback((patch: Partial<NominationStep3Form>) => {
    setForm((prev) => ({ ...prev, step3: { ...prev.step3, ...patch } }));
  }, []);

  const resetAll = useCallback(() => {
    setForm(initialState);
  }, []);

  const submitForm = useCallback(async (): Promise<SubmitResult> => {
    try {
      const payload: NominationSubmitPayload = {
        ...form.step1,
        ...form.step2,
        ...form.step3,
      };

      await submitNominationForm(payload);
      return { ok: true };
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Submit failed';
      return { ok: false, error: msg };
    }
  }, [form]);

  const value = useMemo<Ctx>(
    () => ({
      form,
      setStep1,
      setStep2,
      setStep3,
      resetAll,
      submitForm,
    }),
    [form, setStep1, setStep2, setStep3, resetAll, submitForm]
  );

  return (
    <NominationFormContext.Provider value={value}>
      {children}
    </NominationFormContext.Provider>
  );
}

export function useNominationForm() {
  const ctx = useContext(NominationFormContext);
  if (!ctx) {
    throw new Error(
      'useNominationForm must be used inside NominationFormProvider'
    );
  }
  return ctx;
}
