import * as React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const NotFound = () => {
  return (
    <main>
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
        >
          <Typography
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            Oops! Page Not Found!
          </Typography>
      </Box>
    </main>
  )
}

export default NotFound