import { Box, BoxProps } from '@mui/material';
import { Typography } from '../../common/Typography';

interface SectionProps extends BoxProps {
  title?: string;
  subtitle?: string;
  headerAction?: React.ReactNode;
}

export const Section = ({
  title,
  subtitle,
  headerAction,
  children,
  ...props
}: SectionProps) => (
  <Box {...props}>
    {(title || subtitle || headerAction) && (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 3,
        }}
      >
        <Box>
          {title && (
            <Typography variant="h5" gutterBottom>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
        </Box>
        {headerAction && <Box sx={{ ml: 2 }}>{headerAction}</Box>}
      </Box>
    )}
    {children}
  </Box>
);
