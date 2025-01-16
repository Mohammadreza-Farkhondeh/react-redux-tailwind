import {
  TextField as MuiTextField,
  TextFieldProps as MuiTextFieldProps,
} from '@mui/material';

interface TextFieldProps extends MuiTextFieldProps {
  variant?: 'primary' | 'secondary' | 'filled' | 'standard' | 'contained';
}

const variantMapping = {
  primary: 'outlined',
  secondary: 'filled',
  filled: 'filled',
  standard: 'standard',
} as const;

export const TextField = ({
  variant = 'primary',
  fullWidth = true,
  margin = 'normal',
  ...props
}: TextFieldProps) => (
  <MuiTextField
    variant={variantMapping[variant]}
    fullWidth={fullWidth}
    margin={margin}
    {...props}
  />
);

export default TextField;
