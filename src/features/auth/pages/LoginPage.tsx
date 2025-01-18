import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../store';
import { Grid, GridItem } from '../../../components/layout/Grid';
import Logo from '../../../assets/Logo';
import { LoginForm } from '../components/LoginForm';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Typography, Divider, Stack } from '@mui/material';

const LoginPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-end"
      sx={{ minHeight: '80vh' }}
    >
      {/* Main Content */}
      <GridItem xs={12}>
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          sx={{ minHeight: 'calc(80vh - 68px)' }}
        >
          <GridItem sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="center"
            >
              {/* Logo */}
              {/* <GridItem xs={12} sx={{ mb: 3 }}>
                  <Link to="/" aria-label="logo">
                    <Logo />
                  </Link>
                </GridItem> */}
              {/* Welcome Text */}
              <GridItem xs={12}>
                <Stack alignItems="center" justifyContent="center" spacing={1}>
                  <Typography
                    color="secondary.main"
                    gutterBottom
                    variant={downMD ? 'h4' : 'h3'}
                  >
                    Hi, Welcome Back
                  </Typography>
                  <Typography
                    variant="caption"
                    fontSize="14px"
                    textAlign={{ xs: 'center', md: 'inherit' }}
                  >
                    Enter your credentials to continue
                  </Typography>
                </Stack>
              </GridItem>
              {/* Login Form */}
              <GridItem xs={12}>
                <LoginForm />
              </GridItem>
              {/* Divider */}
              <GridItem xs={12}>
                <Divider />
              </GridItem>
              {/* Signup Link */}
              <GridItem xs={12}>
                <Typography
                  component={Link}
                  to="/signup"
                  color="secondary.main"
                  variant="subtitle1"
                  sx={{ textDecoration: 'none' }}
                >
                  Don&apos;t have an account? Sign Up
                </Typography>
              </GridItem>
            </Grid>
          </GridItem>
        </Grid>
      </GridItem>
      {/* Footer
      <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
        <AuthFooter />
      </Grid> */}
    </Grid>
  );
};

export default LoginPage;
