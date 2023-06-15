import * as React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Main from '../pages/Main'

const Landing = ({isAuthenticated}) => {
  if (isAuthenticated) {
    return <Navigate to="/profile" />
  }

  return (
    <Routes>
      <Route path='/' element={<Main />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
    </Routes>
  )
}

export default Landing