import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import Auth from './pages/auth'
import Profile from './pages/profile'
import Navbar from './pages/layout/Navbar'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Notification from './pages/layout/Notification'
import { loadUser, logout, store } from './store'
import setAuthToken from './utils/setAuthToken'
import PrivateRoute from './pages/routing/PrivateRoute'
import Toast from './components/Toast'

const defaultTheme = createTheme();

const App = () => {
  const [toastOpen, setToastOpen] = useState(false);
  const [toastSeverity, setToastSeverity] = useState('info');
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { alert, severity } = useSelector((state) => state.alert)
  // const alert = 'alert'
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    dispatch(loadUser());

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch(logout());
    });
  }, [dispatch]);

  useEffect(() => {
      alert && setToastOpen(true)
      setToastSeverity(severity)
  }, [alert, severity])

  const handleCloseToast = () => {
    setToastOpen(false)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Navbar />
      <Toast open={toastOpen} message={alert} severity={toastSeverity} onClose={handleCloseToast} />
      <Routes>
        <Route path="/" element={<Auth isAuthenticated={isAuthenticated} />} />
        <Route path="login" element={<Login isAuthenticated={isAuthenticated} />} />
        <Route path="register" element={<Register isAuthenticated={isAuthenticated} />} />
        <Route
          path="profile"
          element={<PrivateRoute component={Profile} />}
        />
        <Route path="success" element={<Notification title="Success" />} />
        <Route path="/*" element={<Notification title="NotFound" />} />
      </Routes>
    </ThemeProvider>  
  )
}

export default App