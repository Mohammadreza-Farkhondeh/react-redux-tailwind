import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { resetPassword } from '../authActions';
import { TextField, Button, Alert } from '@mui/material';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(resetPassword({ token, password }));
    if (result) setSuccess(true);
  };

  return (
    <form onSubmit={handleSubmit}>
      {success && (
        <Alert severity="success">Password has been reset successfully!</Alert>
      )}
      <TextField
        fullWidth
        margin="normal"
        label="New Password"
        name="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Reset Password
      </Button>
    </form>
  );
};

export default ResetPasswordPage;
