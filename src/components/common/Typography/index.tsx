import {
  Typography as MuiTypography,
  TypographyProps as MuiTypographyProps,
} from '@mui/material';

type VariantType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'subtitle1'
  | 'subtitle2';

interface TypographyProps extends Omit<MuiTypographyProps, 'variant'> {
  variant?: VariantType;
  bold?: boolean;
}

export const Typography = ({
  variant = 'body1',
  bold,
  children,
  ...props
}: TypographyProps) => (
  <MuiTypography
    variant={variant}
    fontWeight={bold ? 'bold' : undefined}
    {...props}
  >
    {children}
  </MuiTypography>
);
