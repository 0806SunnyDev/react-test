import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CarouselComponent from '../../components/CarouselComponent'
import { useSelector } from 'react-redux'

const Profile = () => {
  const userData = useSelector((state) => state.auth.user)

  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 2,
        }}
      >
        <Container maxWidth="sm" style={{ display: 'flex', height: 70 }}>
          <img src={userData[1][0].Avatar} alt='avatar' />
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Welcome {userData[0].FirstName}!
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <CarouselComponent photos={userData[2]} />
      </Container>
    </main>
  )
}

export default Profile