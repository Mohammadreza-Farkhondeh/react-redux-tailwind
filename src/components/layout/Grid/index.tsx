import { Grid2 as MuiGrid, Grid2Props as MuiGridProps } from '@mui/material';
import { ReactNode } from 'react';

// Define breakpoint values type
type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Define responsive value type for any prop
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Define grid alignment options
type GridAlignment = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

interface BaseGridProps
  extends Omit<MuiGridProps, 'spacing' | 'alignItems' | 'justifyContent'> {
  children?: ReactNode;
  spacing?: ResponsiveValue<number>;
  align?: ResponsiveValue<GridAlignment>;
  justify?: ResponsiveValue<
    'start' | 'center' | 'end' | 'space-between' | 'space-around'
  >;
  padded?: boolean | ResponsiveValue<number>;
  fullHeight?: boolean;
  fullWidth?: boolean;
}

// Helper function to convert responsive values to MUI's style system
const createResponsiveValue = <T,>(
  value: ResponsiveValue<T> | undefined,
  prefix: string
): Record<string, unknown> => {
  if (value === undefined) return {};
  if (typeof value !== 'object') return { [prefix]: value };

  return Object.entries(value).reduce(
    (acc, [breakpoint, val]) => ({
      ...acc,
      [`${prefix}${breakpoint === 'xs' ? '' : breakpoint.toUpperCase()}`]: val,
    }),
    {}
  );
};

// Main Grid component
export const Grid = ({
  spacing = 2,
  align,
  justify,
  padded = false,
  fullHeight = false,
  fullWidth = false,
  children,
  sx,
  ...props
}: BaseGridProps) => {
  const spacingProps = createResponsiveValue(spacing, 'spacing');
  const alignProps = createResponsiveValue(align, 'alignItems');
  const justifyProps = createResponsiveValue(justify, 'justifyContent');

  const getPadding = () => {
    if (typeof padded === 'boolean') return padded ? 2 : 0;
    return padded;
  };

  const paddingProps = createResponsiveValue(getPadding(), 'p');

  return (
    <MuiGrid
      container
      {...spacingProps}
      {...alignProps}
      {...justifyProps}
      {...props}
      sx={{
        ...(fullHeight && { height: '100%' }),
        ...(fullWidth && { width: '100%' }),
        ...paddingProps,
        ...sx,
      }}
    >
      {children}
    </MuiGrid>
  );
};

// Grid Item component
interface GridItemProps extends Omit<MuiGridProps, 'item'> {
  children?: ReactNode;
  grow?: boolean;
  shrink?: boolean;
  noWrap?: boolean;
  align?: GridAlignment;
  order?: ResponsiveValue<number>;
}

export const GridItem = ({
  children,
  grow = false,
  shrink = false,
  noWrap = false,
  align,
  order,
  sx,
  ...props
}: GridItemProps) => {
  const orderProps = createResponsiveValue(order, 'order');

  return (
    <MuiGrid
      item
      {...orderProps}
      {...props}
      sx={{
        ...(grow && { flexGrow: 1 }),
        ...(shrink && { flexShrink: 1 }),
        ...(noWrap && { flexWrap: 'nowrap' }),
        ...(align && { alignSelf: align }),
        ...sx,
      }}
    >
      {children}
    </MuiGrid>
  );
};

// Useful grid composition components
export const GridCenter = ({ children, ...props }: BaseGridProps) => (
  <Grid align="center" justify="center" {...props}>
    {children}
  </Grid>
);

export const GridSpaceBetween = ({ children, ...props }: BaseGridProps) => (
  <Grid align="center" justify="space-between" {...props}>
    {children}
  </Grid>
);

// Usage example:
/*
import { Grid, GridItem, GridCenter, GridSpaceBetween } from './Grid';

// Basic usage
<Grid spacing={2}>
  <GridItem xs={12} md={6}>Content</GridItem>
</Grid>

// Responsive spacing
<Grid spacing={{ xs: 1, sm: 2, md: 3 }}>
  <GridItem xs={12}>Content</GridItem>
</Grid>

// Alignment and justification
<Grid align="center" justify="space-between">
  <GridItem>Left</GridItem>
  <GridItem>Right</GridItem>
</Grid>

// With padding and full height
<Grid padded fullHeight>
  <GridItem grow>Grows to fill space</GridItem>
</Grid>

// Using composition components
<GridCenter>
  <GridItem>Centered Content</GridItem>
</GridCenter>

// Complex responsive layout
<Grid
  spacing={{ xs: 1, md: 2 }}
  align={{ xs: 'center', md: 'start' }}
  justify="space-between"
  padded={{ xs: 1, md: 3 }}
>
  <GridItem xs={12} md={6} order={{ xs: 2, md: 1 }}>
    First on desktop, second on mobile
  </GridItem>
  <GridItem xs={12} md={6} order={{ xs: 1, md: 2 }}>
    Second on desktop, first on mobile
  </GridItem>
</Grid>
*/
