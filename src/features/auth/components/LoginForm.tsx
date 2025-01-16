import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { resetAuthState } from '../authSlice';
import { login } from '../authActions';
import type { LoginRequest } from '../authTypes';
import { Alert } from '../../../components/common/Alert';
import { TextField } from '../../../components/common/TextField';
import { Button } from '../../../components/common/Button';

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const [credentials, setCredentials] = useState<LoginRequest>({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(resetAuthState());
    await dispatch(login(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        margin="normal"
        label="Username"
        name="username"
        type="text"
        value={credentials.username}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Password"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChange}
        required
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        disabled={status === 'loading'}
        sx={{ mt: 2 }}
      >
        {status === 'loading' ? 'Logging in...' : 'Login'}
      </Button>
    </form>
  );
};
