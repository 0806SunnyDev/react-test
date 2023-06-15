import {
  Grid, 
  Box, 
  TextField, 
  Button, 
  Link 
} from '@mui/material'
import React from 'react'

import Dropzone from './Dropzone'

const RegisterForm = ({
  formData,
  errors,
  setErrors,
  handleChange,
  onDrop,
  handlePhotoDeleteClick,
  handleSubmit,
}) => {
  return (
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
          <Dropzone
            formData={formData}
            errors={errors}
            onDrop={onDrop}
            handlePhotoDeleteClick={handlePhotoDeleteClick}
          />
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
  )
}

export default RegisterForm