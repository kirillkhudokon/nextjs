'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useSession } from 'next-auth/react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import Link from 'next/link'

export default function CreatePost() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      title: formData.get('title') ?? '',
      url: formData.get('url') ?? '',
      content: formData.get('content') ?? ''
    }

    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      })

      if (!response.ok) {
        const error = await response.json()
        setError(error.error || 'Failed to create post')
        setIsSubmitting(false)
        return
      }

      const post = await response.json()
      router.push(`/posts/${post.url}`)
    } catch (err) {
      setError('Network error. Please try again.')
      setIsSubmitting(false)
    }
  }

  if (status === 'loading') {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (!session) {
    return (
      <Container maxWidth="sm" sx={{ py: 4 }}>
        <Alert severity="warning">
          Пожалуйста, войдите в систему, чтобы создать пост.
          <Button component={Link} href="/auth/signin" sx={{ ml: 2 }}>
            Войти
          </Button>
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={2} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Создать новый пост
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            id="title"
            name="title"
            label="Заголовок"
            fullWidth
            required
            margin="normal"
            placeholder="Введите заголовок поста"
            autoFocus
          />

          <TextField
            id="url"
            name="url"
            label="URL (slug)"
            fullWidth
            required
            margin="normal"
            placeholder="my-post-url"
            helperText="Будет использоваться в адресе страницы"
          />

          <TextField
            id="content"
            name="content"
            label="Содержание"
            fullWidth
            required
            multiline
            rows={12}
            margin="normal"
            placeholder="Напишите содержание поста..."
          />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isSubmitting}
              fullWidth
            >
              {isSubmitting ? 'Создание...' : 'Создать пост'}
            </Button>
            <Button
              component={Link}
              href="/posts"
              variant="outlined"
              size="large"
            >
              Отмена
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  )
}
