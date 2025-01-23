import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { verifyEmail } from '../authActions';
import { Alert } from '@mui/material';

const EmailVerificationPage = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'success' | 'error'>();

  useEffect(() => {
    const verify = async () => {
      const result = await dispatch(verifyEmail(token));
      setStatus(result ? 'success' : 'error');
    };
    verify();
  }, [dispatch, token]);

  return (
    <div>
      {status === 'success' ? (
        <Alert severity="success">Email successfully verified!</Alert>
      ) : (
        <Alert severity="error">Verification failed. Please try again.</Alert>
      )}
    </div>
  );
};

export default EmailVerificationPage;
