'use client';

import { Stepper, Step, StepLabel } from '@mui/material';

type Props = {
  activeStep: number;
};

export default function NominationStepper({ activeStep }: Props) {
  return (
    <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 3 }}>
      {[0, 1, 2].map((_, index) => (
        <Step key={index}>
          <StepLabel />
        </Step>
      ))}
    </Stepper>
  );
}
