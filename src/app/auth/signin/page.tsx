'use client'

import { signIn } from 'next-auth/react'
import { Box, Button, Container, Paper, Typography } from '@mui/material'

export default function SignIn() {
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Sign In
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 4 }}>
          Sign in with your AWS Cognito account
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            size="large"
            fullWidth
            onClick={() => signIn('cognito', { callbackUrl: '/posts' })}
          >
            Sign in
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
