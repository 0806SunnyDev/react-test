import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Auth from './pages/auth'
import Profile from './pages/profile'
import Navbar from './pages/layout/Navbar'
import Login from './pages/auth/Login'
import RegisterForm from './pages/auth/RegisterForm'
import NotFound from './pages/layout/NotFound'
import { loadUser, logout, store } from './store'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './pages/routing/PrivateRoute'

const defaultTheme = createTheme();

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<RegisterForm />} />
        <Route
          path="profile"
          element={<PrivateRoute component={Profile} />}
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </ThemeProvider>  
  )
}

export default App