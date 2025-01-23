import { Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline, Paper } from '@mui/material';
import { Footer } from '../../components/navigation/Footer';

const AuthLayout = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: (theme) => theme.palette.background,
    }}
  >
    <Box
      component="main"
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 2,
      }}
    >
      <Container maxWidth="sm">
        <CssBaseline />
        <Paper
          elevation={3}
          sx={{
            p: 2,
            borderRadius: 2,
            boxShadow: (theme) => theme.shadows[10],
            backgroundColor: (theme) => theme.palette.background.paper,
          }}
        >
          <Outlet />
        </Paper>
      </Container>
    </Box>

    <Footer />
  </Box>
);

export default AuthLayout;
