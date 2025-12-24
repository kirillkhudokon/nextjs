'use client';

import { useState, useTransition } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import type { Post } from '@/types/posts'
import { updatePost } from './actions'
import { redirect } from 'next/navigation'

type EditPostFormProps = {
  post: Post
  slug: string
}

export function EditPostForm({ post, slug }: EditPostFormProps) {
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (formData: FormData) => {
    setError('')
    
    startTransition(async () => {
      const result = await updatePost(slug, formData)
      
      if (result?.error) {
        setError(result.error)
      } else if (result?.success && result.url) {
        redirect(`/posts/${result.url}`)
      }
    })
  }

  return (
    <>
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
          defaultValue={post.title}
          autoFocus
        />

        <TextField
          id="url"
          name="url"
          label="URL (slug)"
          fullWidth
          required
          margin="normal"
          defaultValue={post.url}
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
          defaultValue={post.content}
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending}
            fullWidth
          >
            {isPending ? 'Сохранение...' : 'Сохранить изменения'}
          </Button>
          <Button
            href={`/posts/${post.url}`}
            variant="outlined"
            size="large"
          >
            Отмена
          </Button>
        </Box>
      </Box>
    </>
  )
}
