import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { logout } from '../../store'
import { useDispatch, useSelector } from 'react-redux'

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const onLogout = () => {
    dispatch(logout())
  }

  const logoutLink = (
    <Link onClick={onLogout} href='#!' variant="body2" color="inherit" underline="none">
      Logout
    </Link>
  );

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
          {isAuthenticated && logoutLink}
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar