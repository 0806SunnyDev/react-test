import React from 'react'
import { useSelector } from 'react-redux'
import { Container, Typography, Box, Avatar } from '@mui/material'

import CarouselComponent from '../components/CarouselComponent'

const Profile = () => {
  const user = useSelector(state => state.auth.user?.data?.user)
  const clientData = useSelector(state => state.auth.user?.data?.clientData)
  const photo = useSelector(state => state.auth.user?.data?.photo)
  
  const avatar = clientData?.Avatar

  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 3,
          pb: 3,
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
              width: 80,
              height: 80,
              bgcolor: 'primary.main',
              border: '4px solid #1976d2'
            }}
            src={avatar}
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
            Welcome <strong>{user?.FullName}</strong>!
          </Typography>
        </Container>
      </Box>
      <Container maxWidth="lg">
        <CarouselComponent photos={photo} />
      </Container>
    </main>
  )
}

export default Profile