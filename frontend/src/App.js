import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'

import PrivateRoute from './routes/PrivateRoute'
import Header from './layout/Header'
import Landing from './layout/Landing'
import Main from './pages/Main'
import Register from './pages/Register'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Notification from './components/Notification'
import Toast from './components/Toast'
import setAuthToken from './utils/setAuthToken'
import { loadUser, logout, store } from './store'

const defaultTheme = createTheme()

const App = () => {
  const [toastOpen, setToastOpen] = useState(false)
  const [toastSeverity, setToastSeverity] = useState('info')
  
  const { isAuthenticated } = useSelector((state) => state.auth)
  const { alert, severity } = useSelector((state) => state.alert)
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    dispatch(loadUser())

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch(logout())
    })
  }, [dispatch])

  useEffect(() => {
      alert && setToastOpen(true)
      setToastSeverity(severity)
  }, [alert, severity])

  const handleCloseToast = () => {
    setToastOpen(false)
  }

  return (
    <ThemeProvider theme={defaultTheme}>
      <Header />
      <Toast open={toastOpen} message={alert} severity={toastSeverity} onClose={handleCloseToast} />
      <Routes>
        <Route path="/" element={<Landing isAuthenticated={isAuthenticated} />}>
          <Route path='/' element={<Main />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Route>
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