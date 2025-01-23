import { Skeleton as MuiSkeleton, Box } from '@mui/material';

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: number | string;
  height?: number | string;
  count?: number;
  spacing?: number;
}

export const Skeleton = ({
  variant = 'text',
  width,
  height,
  count = 1,
  spacing = 1,
}: SkeletonProps) => (
  <Box sx={{ '& > *:not(:last-child)': { mb: spacing } }}>
    {Array.from({ length: count }).map((_, index) => (
      <MuiSkeleton
        key={index}
        variant={variant}
        width={width}
        height={height}
      />
    ))}
  </Box>
);
