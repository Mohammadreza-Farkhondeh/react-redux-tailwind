import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Box,
} from '@mui/material';
import { useState } from 'react';

interface StepItem {
  label: string;
  content: React.ReactNode;
  optional?: boolean;
}

interface StepperProps {
  steps: StepItem[];
  orientation?: 'horizontal' | 'vertical';
  onComplete?: () => void;
}

export const Stepper = ({
  steps,
  orientation = 'horizontal',
  onComplete,
}: StepperProps) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    const nextStep = activeStep + 1;
    if (nextStep === steps.length) {
      onComplete?.();
    } else {
      setActiveStep(nextStep);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <MuiStepper activeStep={activeStep} orientation={orientation}>
      {steps.map((step, index) => (
        <Step key={step.label}>
          <StepLabel optional={step.optional}>{step.label}</StepLabel>
          {orientation === 'vertical' && (
            <StepContent>
              {step.content}
              <Box sx={{ mb: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  sx={{ mt: 1, mr: 1 }}
                >
                  {index === steps.length - 1 ? 'Finish' : 'Continue'}
                </Button>
                <Button
                  disabled={index === 0}
                  onClick={handleBack}
                  sx={{ mt: 1, mr: 1 }}
                >
                  Back
                </Button>
              </Box>
            </StepContent>
          )}
        </Step>
      ))}
    </MuiStepper>
  );
};
