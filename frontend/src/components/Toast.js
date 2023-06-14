import React from 'react';
import { Snackbar } from '@mui/material';

const Toast = ({ open, message, onClose }) => {
  console.log('alert: ', message)

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      message={message}
    />
  );
};

export default Toast;
