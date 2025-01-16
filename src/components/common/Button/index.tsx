import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

interface ButtonProps extends Omit<MuiButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'text' | 'outline' | 'contained';
}

const variantMapping = {
  primary: 'contained',
  secondary: 'outlined',
  text: 'text',
  outline: 'outlined',
} as const;

export const Button = ({
  variant = 'primary',
  size = 'medium',
  children,
  ...props
}: ButtonProps) => (
  <MuiButton variant={variantMapping[variant]} size={size} {...props}>
    {children}
  </MuiButton>
);
