import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
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

const Login = () => {
  const dispatch = useDispatch()

  // const [formData, setFormData] = useState({
  //   email: '',
  //   password: '',
  // })

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    // if (data.get('email') === '') {
    //   setErrors({email: 'Email is required!'})
    // } else {
      dispatch(
        login({
          email: data.get('email'),
          password: data.get('password'),
        })
      )
    // }
  }

  // const validate = (data) => {

  // }

  // const handleInputChange = (event) => {
  //   const {name, value} = event.target
  //   setFormData({ ...formData, [name]: value })
  // }

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
          Log In
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            fullWidth
            required
            id="email"
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            error={Boolean(errors.email)}
            helperText={errors.email}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error={Boolean(errors.password)}
            helperText={errors.password}
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