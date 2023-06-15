import React from 'react'
import { Navigate, useOutlet } from 'react-router-dom'

const Landing = ({isAuthenticated}) => {
  const outlet = useOutlet()

  if (isAuthenticated) {
    return <Navigate to="/profile" />
  }

  return outlet
}

export default Landing