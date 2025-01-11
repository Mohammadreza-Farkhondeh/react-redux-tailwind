import { Grid2 as MuiGrid, Grid2Props as MuiGridProps } from '@mui/material';

interface GridProps extends Omit<MuiGridProps, 'spacing'> {
  spacing?:
    | number
    | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number };
}

export const Grid = ({ spacing = 2, children, ...props }: GridProps) => (
  <MuiGrid container spacing={spacing} {...props}>
    {children}
  </MuiGrid>
);

export const GridItem = ({ children, ...props }: MuiGridProps) => (
  <MuiGrid item {...props}>
    {children}
  </MuiGrid>
);
