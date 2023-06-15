import React, { useEffect } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import CarouselComponent from '../components/CarouselComponent'
import { useSelector } from 'react-redux'
import { Avatar } from '@mui/material'

const Profile = () => {
  const user = useSelector((state) => state.auth.user?.data?.user)
  const clientData = useSelector((state) => state.auth.user?.data?.clientData)
  const photo = useSelector((state) => state.auth.user?.data?.photo)
  
  const avatar = clientData?.Avatar

  useEffect(()=>{
    console.log(user, clientData, photo)
  },[user, clientData, photo])
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
              width: 70,
              height: 70,
              bgcolor: 'primary.main',
              border: '7px solid #1976d2'
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