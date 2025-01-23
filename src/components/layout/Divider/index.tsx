import { Divider as MuiDivider, DividerProps } from '@mui/material';

interface CustomDividerProps extends DividerProps {
  spacing?: number;
}

export const Divider = ({ spacing = 2, ...props }: CustomDividerProps) => (
  <MuiDivider
    sx={{
      my: spacing,
      ...props.sx,
    }}
    {...props}
  />
);
