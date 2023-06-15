import {
  Container, 
  Box, 
  Typography, 
  Avatar, 
} from '@mui/material'
import React, { useState } from 'react'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import { useDispatch } from 'react-redux'
import { register } from '../store'
import { formValidator } from '../utils/formValidator'
import { checkValidate } from '../utils/checkValidate'
import RegisterForm from '../components/RegisterFormComponent'

const Register = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    photos: []
  })

  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    const { name, value } = event.target
    if (name !== 'photos') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))
      setErrors(formValidator(formData))
    }

    console.log('errors: ', errors)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const formIsValid = checkValidate()
    if (formData.password !== formData.confirmPassword) {
      let errorMessage = 'Password does not match!'

      setErrors((prevErrors) => ({
        ...prevErrors,
        password: errorMessage,
        confirmPassword: errorMessage,
      }))

      setFormData((prevData) => ({
        ...prevData,
        confirmPassword: '',
      }))
    } else if (formIsValid) {
      const data = new FormData()
      data.append('firstName', formData.firstName)
      data.append('lastName', formData.lastName)
      data.append('email', formData.email)
      data.append('password', formData.password)

      for (let i = 0; i < formData.photos.length; i++) {
        data.append('photos', formData.photos[i])
      }
      dispatch(register(data))
    } else {
      console.log("Form Error")
    }
  }

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
        <RegisterForm
          formData={formData}
          setFormData={setFormData}
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Container>
  )
}

export default Register
