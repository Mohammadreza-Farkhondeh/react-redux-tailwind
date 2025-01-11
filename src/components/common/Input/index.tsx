import { TextField, TextFieldProps, InputAdornment } from '@mui/material';
import { ReactNode } from 'react';

interface InputProps extends Omit<TextFieldProps, 'variant'> {
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  error?: boolean;
  helperText?: string;
}

export const Input = ({
  startIcon,
  endIcon,
  error,
  helperText,
  ...props
}: InputProps) => (
  <TextField
    variant="outlined"
    size="small"
    fullWidth
    error={error}
    helperText={helperText}
    InputProps={{
      startAdornment: startIcon && (
        <InputAdornment position="start">{startIcon}</InputAdornment>
      ),
      endAdornment: endIcon && (
        <InputAdornment position="end">{endIcon}</InputAdornment>
      ),
    }}
    {...props}
  />
);
