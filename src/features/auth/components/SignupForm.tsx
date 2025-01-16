import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store';
import { resetAuthState } from '../authSlice';
import { register } from '../authActions';
import type { RegisterRequest } from '../authTypes';
import { Alert } from '../../../components/common/Alert';
import { TextField } from '../../../components/common/TextField';
import { Button } from '../../../components/common/Button';

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  const { status, error } = useAppSelector((state) => state.auth);
  const [credentials, setCredentials] = useState<RegisterRequest>({
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
    await dispatch(register(credentials));
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        fullWidth
        margin="normal"
        label="Userame"
        name="username"
        type="text"
        value={credentials.username}
        onChange={handleChange}
        required
      />
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={credentials.email}
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
        {status === 'loading' ? 'Signing up...' : 'Signup'}
      </Button>
    </form>
  );
};
