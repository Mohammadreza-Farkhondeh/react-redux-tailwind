import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../../store';
import { activateAccount } from '../authActions';
import { Alert } from '@mui/material';

const AccountActivationPage = () => {
  const { token } = useParams();
  const dispatch = useAppDispatch();
  const [status, setStatus] = useState<'success' | 'error'>();

  useEffect(() => {
    const activate = async () => {
      const result = await dispatch(activateAccount(token));
      setStatus(result ? 'success' : 'error');
    };
    activate();
  }, [dispatch, token]);

  return (
    <div>
      {status === 'success' ? (
        <Alert severity="success">Account successfully activated!</Alert>
      ) : (
        <Alert severity="error">Activation failed. Please try again.</Alert>
      )}
    </div>
  );
};

export default AccountActivationPage;
