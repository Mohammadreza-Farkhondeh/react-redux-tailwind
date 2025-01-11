import { Alert as MuiAlert, AlertProps as MuiAlertProps } from '@mui/material';

interface AlertProps extends Omit<MuiAlertProps, 'variant'> {
  variant?: 'success' | 'error' | 'warning' | 'info';
}

export const Alert = ({ variant = 'info', ...props }: AlertProps) => (
  <MuiAlert severity={variant} {...props} />
);
