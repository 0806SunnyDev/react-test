import React from 'react'
import { Snackbar, Alert } from '@mui/material'

const Toast = ({ open, message, severity, onClose }) => {
  return (
    <Snackbar
      open={open} 
      autoHideDuration={3000} 
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <Alert onClose={onClose} severity={severity} action={null}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Toast
