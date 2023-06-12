import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

const Navbar = () => {
  return (
    <>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Link href="/" variant="body2">
            <Typography variant="h6" color="white" noWrap>
              React Skill Test
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar