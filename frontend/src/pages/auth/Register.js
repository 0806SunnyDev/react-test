import React, { useState, useCallback } from 'react';
import { Navigate } from 'react-router-dom'
import { Container, Grid, Box, Typography, TextField, Button, Avatar, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { register } from '../../store';
import { containsNumber, isValidEmail } from '../../utils/validator';

const Register = ({isAuthenticated}) => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photos: [],
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photos: '',
  });

  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: acceptedFiles,
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  if (isAuthenticated) {
    return <Navigate to="/success" />;
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name !== 'photos') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }

    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    let errorMessage = '';

    if (fieldName === 'firstName' || fieldName === 'lastName') {
      if (!value) {
        errorMessage = `${fieldName} is required.`
      } else if (value.length < 2 || value.length > 25) {
        errorMessage = `${fieldName} must be at between 2 and 25.`
      }
    }
  
    if (fieldName === 'email') {
      if (!value) {
        errorMessage = 'Email is required.';
      } else if (!isValidEmail(value)) {
        errorMessage = 'Invalid email address.';
      }
    }
  
    if (fieldName === 'password' || fieldName === 'confirmPassword') {
      if (!value) {
        errorMessage = 'Password is required.';
      } else if (value.length < 6) {
        errorMessage = 'Password case number is at least 6'
      } else if (!containsNumber(value)) {
        errorMessage = 'Password must includes at least 1 number'

      }
      
    }
  
    setErrors((prevErrors) => ({
      ...prevErrors,
      [fieldName]: errorMessage,
    }));
  };

  const validateForm = () => {
    let formIsValid = true;

    validateField('firstName', formData.firstName);
    validateField('lastName', formData.lastName);
    validateField('email', formData.email);
    validateField('password', formData.password);
    validateField('confirmPassword', formData.confirmPassword);
  
    if ( errors.firstName || errors.lastName || errors.email || errors.password || errors.confirmPassword) {
      formIsValid = false;
    }
  
    return formIsValid;
  };

  const handleRemovePhoto = (index) => {
    setFormData((prevData) => {
      const updatedPhotos = [...prevData.photos];
      updatedPhotos.splice(index, 1);
      return {
        ...prevData,
        photos: updatedPhotos,
      };
    });
  };

  const handleDeleteClick = (event, index) => {
    event.stopPropagation();
    handleRemovePhoto(index);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formIsValid = validateForm();
    if (formData.photos.length < 4) {
      let errorMessage = 'Photos must be uploaded at least 4!'

      setErrors((prevErrors) => ({
        ...prevErrors,
        photos: errorMessage,
      }));
    } else if (formData.password !== formData.confirmPassword) {
      let errorMessage = 'Password does not match!'

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: errorMessage,
        confirmPassword: errorMessage,
      }));

      setFormData((prevData) => ({
        ...prevData,
        confirmPassword: '',
      }));
    } else if (formIsValid) {
      const data = new FormData()
      data.append('firstName', formData.firstName)
      data.append('lastName', formData.lastName)
      data.append('email', formData.email)
      data.append('password', formData.password)

      for (let i = 0; i < formData.photos.length; i++) {
        data.append('photos', formData.photos[i]);
      }
      console.log('register data: ', data)
      dispatch(register(data))
    } else {
      console.log("Form Error")
    }
  };

  return (
    <Container component="main" maxWidth="md">
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
          Register New Account
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
                fullWidth
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <div
                {...getRootProps()} 
                style={{
                  border: '1px dashed #ccc',
                  borderRadius: 10,
                  padding: '1rem',
                  marginTop: '1rem',
                  textAlign: 'center'
                }}
              >
                <Typography style={{color: 'red'}}>{errors.photos}</Typography>
                <input {...getInputProps()} name="photos" />
                {isDragActive ? (
                  <p>Drop your photos here...</p>
                ) : (
                  <Grid>{formData.photos.length > 0 ? (
                    <>
                      <strong>Selected Photos:</strong>
                      <br />
                      {formData.photos.map((file, index) => (
                        <div key={index} style={{ display: 'inline-block', position: 'relative' }}>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`File ${index + 1}`}
                            style={{ height: '100px', margin: '0.5rem' }}
                            />
                          <Button
                            variant="contained"
                            size="small"
                            onClick={(event) => handleDeleteClick(event, index)}
                            style={{ position: 'absolute', bottom: '0', left: '50%', transform: 'translateX(-50%)' }}
                            >
                            Delete
                          </Button>
                        </div>
                      ))}
                    </>
                  ) : ("Drag and drop your photos here, or click to select...")}
                  </Grid>
                  )}
              </div>
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >Register</Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="login" variant="body2">
                  Already have an account? Log In
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Register;
