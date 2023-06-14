import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CarouselComponent from '../../components/CarouselComponent'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'

const Profile = () => {
  const userData = useSelector((state) => state.auth.user.data)

  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 2,
        }}
      >
        <Container
          maxWidth="sm"
          style={{
            display: 'flex',
            height: 70,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Avatar
            sx={{
              width: 70,
              height: 70,
              bgcolor: 'primary.main',
              border: '7px solid #1976d2'
            }}
            src={userData[1][0].Avatar}
            alt='avatar'
          />
          <Typography
            component="h4"
            variant="h4"
            align="center"
            color="text.primary"
            style={{
              marginLeft: 30
            }}
          >
            Welcome {userData[0].FullName}!
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