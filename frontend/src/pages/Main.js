import * as React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'

const Main = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 30,
        }}
        >
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            REACT SKILL TEST
          </Typography>
          <Stack
            sx={{ pt: 4, pb: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
            >
            <Button variant="contained" href='login'>log in</Button>
            <Button variant="outlined" href='register'>register</Button>
          </Stack>
          <Grid container justifyContent="center">
            <Grid item>
              <Link href="register" variant="body2">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
      </Box>
    </Container>
  )
}

export default Main