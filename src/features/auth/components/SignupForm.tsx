import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../store';
import { resetAuthState } from '../authSlice';
import { register } from '../authActions';
import type { RegisterRequest } from '../authTypes';

// Material-UI components
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';

// Third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// Assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Utility
import { strengthColor, strengthIndicator } from '../utils/passwordStrength';

export const SignupForm = () => {
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [checked, setChecked] = useState(true);
  const [strength, setStrength] = useState(0);
  const [level, setLevel] = useState();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event: React.MouseEvent) =>
    event.preventDefault();
  const changePassword = (value: string) => {
    const temp = strengthIndicator(value);
    setStrength(temp);
    setLevel(strengthColor(temp));
  };

  const handleSubmit = async (values: RegisterRequest) => {
    dispatch(resetAuthState());
    await dispatch(register(values));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        username: '',
        email: '',
        password: '',
      }}
      validationSchema={Yup.object().shape({
        username: Yup.string().required('Username is required'),
        email: Yup.string()
          .email('Must be a valid email')
          .required('Email is required'),
        password: Yup.string()
          .min(6, 'Password must be at least 6 characters')
          .required('Password is required'),
      })}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        touched,
        values,
      }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={Boolean(touched.username && errors.username)}
                variant="outlined"
              >
                <InputLabel htmlFor="username">Username</InputLabel>
                <OutlinedInput
                  id="username"
                  name="username"
                  value={values.username}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Username"
                />
                {touched.username && errors.username && (
                  <FormHelperText>{errors.username}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={Boolean(touched.email && errors.email)}
                variant="outlined"
              >
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  id="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  label="Email"
                />
                {touched.email && errors.email && (
                  <FormHelperText>{errors.email}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl
                fullWidth
                error={Boolean(touched.password && errors.password)}
                variant="outlined"
              >
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {touched.password && errors.password && (
                  <FormHelperText>{errors.password}</FormHelperText>
                )}
              </FormControl>
            </Grid>
          </Grid>

          {strength > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography>Password Strength</Typography>
              <Box
                sx={{ width: 85, height: 8, backgroundColor: level?.color }}
              />
            </Box>
          )}

          {error && (
            <Box sx={{ mt: 2 }}>
              <FormHelperText error>{error}</FormHelperText>
            </Box>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={() => setChecked(!checked)}
              />
            }
            label={
              <Typography variant="body2">
                Agree to{' '}
                <Link to="/terms">
                  <strong>Terms & Conditions</strong>
                </Link>
              </Typography>
            }
          />

          <Box sx={{ mt: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? 'Signing up...' : 'Sign Up'}
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
};
