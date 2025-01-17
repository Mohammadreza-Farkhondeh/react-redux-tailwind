import { Outlet } from 'react-router-dom';
import { Box, Container, CssBaseline } from '@mui/material';
import { Navbar } from '../../components/navigation/Navbar';
import { Footer } from '../../components/navigation/Footer';

const AuthLayout = () => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
      backgroundColor: (theme) => theme.palette.background.default,
    }}
  >
    <Navbar title="Authentication" />

    <Box
      component="main"
      sx={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <CssBaseline />
        <Outlet />
      </Container>
    </Box>

    <Footer />
  </Box>
);

export default AuthLayout;
