import React, { useState, useCallback } from 'react';
import { Container, Grid, Box, Typography, TextField, Button, Avatar, Link } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { register } from '../../store';

function RegisterForm() {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photos: [],
  });

  const onDrop = useCallback((acceptedFiles) => {
    setFormData((prevData) => ({
      ...prevData,
      photos: acceptedFiles,
    }));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleChange = (event) => {
    if (event.target.name !== 'photos') {
      setFormData((prevData) => ({
        ...prevData,
        [event.target.name]: event.target.value,
      }));
    }
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
    // try {
      const data = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        photos: formData.photos,
      };

      // for (let i = 0; i < formData.photos.length; i++) {
        //   data.append('photos', formData.photos[i]);
        // }
        console.log('register data: ', data)
        dispatch(register(data))

    //   const response = await fetch('/api/register', {
    //     method: 'POST',
    //     body: data,
    //   });

    //   const responseData = await response.json();
    //   console.log(responseData); // Handle the response data
    // } catch (error) {
    //   console.error(error);
    // }
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
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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

export default RegisterForm;
