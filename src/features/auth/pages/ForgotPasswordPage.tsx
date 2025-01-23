import React, { useState } from 'react';
import { useAppDispatch } from '../../../store';
import { sendForgotPasswordEmail } from '../authActions';
import { TextField, Button, Alert } from '@mui/material';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [success, setSuccess] = useState(false);
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    const result = await dispatch(sendForgotPasswordEmail(email));
    if (result) setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && (
        <Alert severity="success">Email sent! Check your inbox.</Alert>
      )}
      <TextField
        fullWidth
        margin="normal"
        label="Email"
        name="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Send Reset Link
      </Button>
    </form>
  );
};

export default ForgotPasswordPage;
