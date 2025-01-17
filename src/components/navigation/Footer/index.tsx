import { Box, Typography } from '@mui/material';

export const Footer = () => (
  <Box
    component="footer"
    sx={{
      py: 2,
      textAlign: 'center',
      backgroundColor: (theme) => theme.palette.background.paper,
    }}
  >
    <Typography variant="body2" color="textSecondary">
      © {new Date().getFullYear()} Your App Name. All rights reserved.
    </Typography>
  </Box>
);
