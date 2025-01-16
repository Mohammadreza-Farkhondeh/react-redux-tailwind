import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Paper, Typography } from '@mui/material';
import { useAppSelector } from '../../../store';
import { SignupForm } from '../components/SignupForm';

export const SignupPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Container maxWidth="sm">
      <Paper sx={{ p: 4, mt: 8 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Signup
        </Typography>
        <SignupForm />
      </Paper>
    </Container>
  );
};
