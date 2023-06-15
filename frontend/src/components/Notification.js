import * as React from 'react'
import { Box, Typography } from '@mui/material'

const Notification = ({title}) => {
  let text

  switch (title) {
    case 'Success':
      text = 'Success!'
      break
    default:
      text = 'Oops! Page Not Found!'
      break
  }

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
            {text}
          </Typography>
      </Box>
    </main>
  )
}

export default Notification