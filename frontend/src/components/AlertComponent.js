import React from 'react';
import { Alert } from '@mui/material';

const AlertComponent = ({ severity, message }) => {
  return <Alert severity={severity}>{message}</Alert>;
};

export default AlertComponent;
