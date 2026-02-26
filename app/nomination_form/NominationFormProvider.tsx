'use client';

import React, { createContext, useContext, useMemo, useState } from 'react';

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
  credit_limit: string;
};

type NominationFormState = {
  step1: NominationStep1Form;
  step2: NominationStep2Form;
  step3: NominationStep3Form;
};

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
    credit_limit: '',
  },
};

type Ctx = {
  form: NominationFormState;

  setStep1: (patch: Partial<NominationStep1Form>) => void;
  setStep2: (patch: Partial<NominationStep2Form>) => void;
  setStep3: (patch: Partial<NominationStep3Form>) => void;

  resetAll: () => void;
};

const NominationFormContext = createContext<Ctx | null>(null);

export function NominationFormProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [form, setForm] = useState<NominationFormState>(initialState);

  const value = useMemo<Ctx>(() => {
    return {
      form,

      setStep1: (patch) =>
        setForm((prev) => ({ ...prev, step1: { ...prev.step1, ...patch } })),

      setStep2: (patch) =>
        setForm((prev) => ({ ...prev, step2: { ...prev.step2, ...patch } })),

      setStep3: (patch) =>
        setForm((prev) => ({ ...prev, step3: { ...prev.step3, ...patch } })),

      resetAll: () => setForm(initialState),
    };
  }, [form]);

  return (
    <NominationFormContext.Provider value={value}>
      {children}
    </NominationFormContext.Provider>
  );
}

export function useNominationForm() {
  const ctx = useContext(NominationFormContext);
  if (!ctx)
    throw new Error(
      'useNominationForm must be used inside NominationFormProvider'
    );
  return ctx;
}
