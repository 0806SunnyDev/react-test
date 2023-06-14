import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Navigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { login } from '../../store'
import { isValidEmail } from '../../utils/validator'

const Login = ({isAuthenticated}) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  if (isAuthenticated) {
    return <Navigate to="/profile" />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';
  
    if (fieldName === 'email') {
      if (!value) {
        errorMessage = 'Email is required.';
      } else if (!isValidEmail(value)) {
        errorMessage = 'Invalid email address.';
      }
    }
  
    if (fieldName === 'password') {
      if (!value) {
        errorMessage = 'Password is required.';
      } else if (value.length < 6) {
        errorMessage = 'Password case number is at least 6'
      }
      
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;
  
    validateField('email', formData.email);
    validateField('password', formData.password);
  
    if (errors.email || errors.password) {
      formIsValid = false;
    }
  
    return formIsValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = validateForm();

    if (formIsValid) {
      await dispatch(login(formData))
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin='normal'
            label="Email Address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            autoFocus
            fullWidth
          />
          <TextField
            margin='normal'
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            fullWidth
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            log in
          </Button>
          <Grid item>
            <Link href="register" variant="body2">
              Don't have an account? Register
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default Login