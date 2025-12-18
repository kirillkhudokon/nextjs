'use client'

import { useSearchParams } from 'next/navigation'
import { Container, Paper, Typography, Button, Box } from '@mui/material'
import Link from 'next/link'

export default function AuthError() {
  const searchParams = useSearchParams()
  const error = searchParams?.get('error')

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom color="error">
          Authentication Error
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          {error === 'Configuration' && 'There is a problem with the server configuration.'}
          {error === 'AccessDenied' && 'Access denied. You do not have permission to sign in.'}
          {error === 'Verification' && 'The verification token has expired or has already been used.'}
          {!error && 'An error occurred during authentication.'}
        </Typography>
        <Box>
          <Button
            component={Link}
            href="/auth/signin"
            variant="contained"
            fullWidth
          >
            Try Again
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}
