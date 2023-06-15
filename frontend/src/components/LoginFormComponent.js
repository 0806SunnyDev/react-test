import React from 'react'
import { Grid, Box, TextField, Button, Link } from '@mui/material'

const LoginForm = ({
  formData,
  errors,
  handleChange,
  handleSubmit,
}) => {
  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            autoFocus
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            log in
          </Button>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="register" variant="body2">
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginForm