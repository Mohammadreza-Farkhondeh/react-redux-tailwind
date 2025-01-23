import {
  Select as MuiSelect,
  MenuItem,
  FormControl,
  InputLabel,
  SelectProps as MuiSelectProps,
  FormHelperText,
} from '@mui/material';

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps extends Omit<MuiSelectProps, 'variant'> {
  options: Option[];
  label?: string;
  error?: boolean;
  helperText?: string;
}

export const Select = ({
  options,
  label,
  error,
  helperText,
  ...props
}: SelectProps) => (
  <FormControl fullWidth error={error} size="small">
    {label && <InputLabel>{label}</InputLabel>}
    <MuiSelect variant="outlined" label={label} {...props}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </MuiSelect>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
