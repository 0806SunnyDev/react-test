import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Container, 
  Box, 
  Typography, 
  Avatar, 
} from '@mui/material'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

import RegisterForm from '../components/RegisterFormComponent'
import { formValidator } from '../utils/formValidator'
import { checkValidate } from '../utils/checkValidate'
import { register } from '../store'

const Register = () => {
  const dispatch = useDispatch()

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photos: []
  })

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    photos: ''
  })

  const onDrop = useCallback(acceptedFiles => {
    setFormData(prevData => ({
      ...prevData,
      photos: [...prevData.photos, ...acceptedFiles],
    }))
  
    setErrors(prevErrors => ({
      ...prevErrors,
      ...formValidator("photos", acceptedFiles )
    }))
  }, [setFormData, setErrors])

  const handleRemovePhoto = index => {
    setFormData(prevData => {
      const updatedPhotos = [...prevData.photos]
      updatedPhotos.splice(index, 1)
      return {
        ...prevData,
        photos: updatedPhotos,
      }
    })
  }
  
  const handlePhotoDeleteClick = (event, index) => {
    event.stopPropagation()
    handleRemovePhoto(index)
  }

  const handleChange = event => {
    const { name, value } = event.target

    if (name !== 'photos') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }))

      setErrors(prevErrors => ({
        ...prevErrors,
        ...formValidator(name, value)
      }))
    }
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const formIsValid = checkValidate(formData)
    console.log('Form Data => ', formData)
    console.log(formIsValid)

    if (formData.password !== formData.confirmPassword) {
      let errorMessage = 'Password does not match!'

      setErrors(prevErrors => ({
        ...prevErrors,
        password: errorMessage,
        confirmPassword: errorMessage,
      }))

      setFormData(prevData => ({
        ...prevData,
        confirmPassword: '',
      }))
    } else if (formIsValid) {
      const data = new FormData()

      data.append('firstName', formData.firstName)
      data.append('lastName', formData.lastName)
      data.append('email', formData.email)
      data.append('password', formData.password)

      formData.photos.map(photo => data.append('photos', photo))

      dispatch(register(data))
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
          errors={errors}
          setErrors={setErrors}
          handleChange={handleChange}
          onDrop={onDrop}
          handlePhotoDeleteClick={handlePhotoDeleteClick}
          handleSubmit={handleSubmit}
        />
      </Box>
    </Container>
  )
}

export default Register
