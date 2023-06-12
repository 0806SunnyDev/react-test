import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CarouselComponent from '../../components/CarouselComponent'

const Profile = () => {
  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 2,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Profile
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <CarouselComponent />
      </Container>
    </main>
  )
}

export default Profile