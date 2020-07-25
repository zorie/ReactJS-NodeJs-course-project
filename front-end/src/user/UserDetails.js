import React from 'react'
import { Box, Typography, Paper } from '@material-ui/core'

function UserDetails({ firstName, lastName, email, age, skinType }) {
  return (
    <Box>
      <Paper>
        <Box p={2}>
        <Box>
            <Typography variant="subtitle2" gutterBottom>
                {firstName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
                {lastName}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" gutterBottom>
                {email}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}

export default UserDetails
