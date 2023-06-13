import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Auth from './pages/auth'
import Profile from './pages/profile'
import Navbar from './pages/layout/Navbar'
import Login from './pages/auth/Login'
import RegisterForm from './pages/auth/RegisterForm'
import NotFound from './pages/layout/NotFound'

const defaultTheme = createTheme();

const App = () => {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterForm />} />
        <Route path="profile" element={<Profile />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>  
  )
}

export default App