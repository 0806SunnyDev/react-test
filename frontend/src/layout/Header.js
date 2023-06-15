import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

import { logout } from '../store'

const Header = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)

  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  const authLink = (
    <ul style={{ display: 'flex' }}>
      <li style={{ listStyleType: 'none', width: 80 }}>
        <Link href="profile" variant="body2" color="inherit" underline="none">
          Profile
        </Link>
      </li>
      <li style={{ listStyleType: 'none', width: 80 }}>
        <Link
          href="#"
          onClick={onLogout}
          variant="body2"
          color="inherit"
          underline="none"
        >Logout</Link>
      </li>
    </ul>
  )

  const guestLink = (
    <ul style={{ display: 'flex' }}>
      <li style={{ listStyleType: 'none', width: 80 }}>
        <Link href="register" variant="body2" color="inherit" underline="none">
          Register
        </Link>
      </li>
      <li style={{ listStyleType: 'none', width: 80 }}>
        <Link href="login" variant="body2" color="inherit" underline="none">
          Login
        </Link>
      </li>
    </ul>
  )

  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" variant="body2">
            <Typography variant="h6" color="white" noWrap>
              React Skill Test
            </Typography>
          </Link>
          {isAuthenticated ? authLink : guestLink}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header