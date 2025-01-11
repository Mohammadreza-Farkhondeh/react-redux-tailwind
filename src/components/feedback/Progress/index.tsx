import {
  LinearProgress,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material';

interface ProgressProps {
  variant?: 'linear' | 'circular';
  value?: number;
  showLabel?: boolean;
  size?: number;
}

export const Progress = ({
  variant = 'linear',
  value,
  showLabel,
  size = 40,
}: ProgressProps) => {
  const isIndeterminate = typeof value !== 'number';

  if (variant === 'circular') {
    return (
      <Box position="relative" display="inline-flex">
        <CircularProgress
          variant={isIndeterminate ? 'indeterminate' : 'determinate'}
          value={value}
          size={size}
        />
        {showLabel && !isIndeterminate && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Typography
              variant="caption"
              component="div"
              color="text.secondary"
            >
              {Math.round(value!)}%
            </Typography>
          </Box>
        )}
      </Box>
    );
  }

  return (
    <Box width="100%">
      <LinearProgress
        variant={isIndeterminate ? 'indeterminate' : 'determinate'}
        value={value}
      />
      {showLabel && !isIndeterminate && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {Math.round(value!)}%
        </Typography>
      )}
    </Box>
  );
};
