import { Snackbar, Alert, AlertColor } from '@mui/material';

interface ToastProps {
  open: boolean;
  message: string;
  severity?: AlertColor;
  onClose: () => void;
  autoHideDuration?: number;
}

export const Toast = ({
  open,
  message,
  severity = 'success',
  onClose,
  autoHideDuration = 6000,
}: ToastProps) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  >
    <Alert onClose={onClose} severity={severity}>
      {message}
    </Alert>
  </Snackbar>
);
