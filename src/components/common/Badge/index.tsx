import { Chip, ChipProps } from '@mui/material';

type BadgeVariant = 'success' | 'error' | 'warning' | 'info' | 'default';

interface BadgeProps extends Omit<ChipProps, 'variant' | 'color'> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, { bg: string; color: string }> = {
  success: { bg: '#E6F4EA', color: '#1E4620' },
  error: { bg: '#FDECEA', color: '#8C1D18' },
  warning: { bg: '#FEF3E6', color: '#804D0D' },
  info: { bg: '#E8F0FE', color: '#174EA6' },
  default: { bg: '#F1F3F4', color: '#3C4043' },
};

export const Badge = ({ variant = 'default', label, ...props }: BadgeProps) => (
  <Chip
    label={label}
    sx={{
      backgroundColor: variantStyles[variant].bg,
      color: variantStyles[variant].color,
      fontWeight: 500,
      fontSize: '0.75rem',
    }}
    {...props}
  />
);
