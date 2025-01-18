import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { resetAuthState } from '../authSlice';
import { login } from '../authActions';
import type { TokenObtainPairRequest } from '../authTypes';

import {
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Typography,
  Stack,
  Box,
  Alert,
  TextField,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values: TokenObtainPairRequest) => {
    dispatch(resetAuthState());
    await dispatch(login(values));
  };

  return (
    <Formik
      initialValues={{ username: '', password: '' }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        isSubmitting,
      }) => (
        <Form>
          {error && <Alert severity="error">{error}</Alert>}

          {/* Username Field */}
          <TextField
            fullWidth
            margin="normal"
            label="Username"
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            required
          />

          {/* Password Field */}
          <TextField
            fullWidth
            margin="normal"
            label="Password"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* Remember Me and Forgot Password */}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            mt={2}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  name="rememberMe"
                />
              }
              label="Remember me"
            />
            <Typography
              variant="subtitle1"
              color="secondary"
              sx={{ textDecoration: 'none', cursor: 'pointer' }}
            >
              Forgot Password?
            </Typography>
          </Stack>

          {/* Submit Button */}
          <Box mt={3}>
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isSubmitting || status === 'loading'}
            >
              {isSubmitting || status === 'loading' ? 'Logging in...' : 'Login'}
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};
