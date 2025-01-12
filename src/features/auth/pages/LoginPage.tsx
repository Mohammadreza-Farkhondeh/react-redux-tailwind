import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography } from '@mui/material';
import { LoginForm } from '../components/LoginForm';
import { useAppSelector } from '../../../store';
import { Navbar } from '../../../components/navigation/Navbar';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar title="waiotech" />
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, mt: 8 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Login
          </Typography>
          <LoginForm />
        </Paper>
      </Container>
    </>
  );
};
