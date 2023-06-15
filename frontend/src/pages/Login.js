import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import { login } from '../store'
import { formValidator } from '../utils/formValidator'
import { checkValidate } from '../utils/checkValidate'
import LoginForm from '../components/LoginFormComponent'

const Login = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({})

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))

    setErrors(formValidator(formData))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formIsValid = checkValidate(errors)

    if (formIsValid) {
      console.log('formData: ', formData)
      await dispatch(login(formData))
    }
  }

  return (
    <Container component="main" maxWidth="sm">
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
        <LoginForm
          formData={formData}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Container>
  )
}

export default Login