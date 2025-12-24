'use client'

import { useState, useTransition } from 'react'
import { useSession } from 'next-auth/react'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import Paper from '@mui/material/Paper'
import CircularProgress from '@mui/material/CircularProgress'
import { createPost } from './actions'
import { ImageUpload } from '@/components/shared/ImageUpload'
import { useImageUpload } from '@/hooks/useImageUpload'
import { useRouter } from 'next/navigation'

export default function CreatePost() {
  const { data: session, status } = useSession()
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const { uploading, handleImageChange, uploadImage } = useImageUpload()
  const router = useRouter()

  const handleSubmit = async (formData: FormData) => {
    setError('')
    
    startTransition(async () => {
      try {
        const imageUrl = await uploadImage()
        if (imageUrl) {
          formData.append('imageUrl', imageUrl)
        }
        
        const result = await createPost(formData)
        if ('error' in result) {
          setError(result.error)
          return
        } else {
          router.push(`/posts/${result.url}`)
        }
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при создании поста')
      }
    })
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
          <Button href="/auth/signin" sx={{ ml: 2 }}>
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

        <Box component="form" action={handleSubmit} noValidate>
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

          <ImageUpload onImageChange={handleImageChange} onError={setError} />

          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              disabled={isPending || uploading}
              fullWidth
            >
              {isPending ? 'Создание...' : 'Создать пост'}
            </Button>
            <Button
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
