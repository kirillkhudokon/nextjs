'use client';

import { useState, useTransition } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'
import type { Post } from '@/types/posts'
import { updatePost } from './actions'
import { useRouter } from 'next/navigation';
import { ImageUpload } from '@/components/shared/ImageUpload'
import { useImageUpload } from '@/hooks/useImageUpload'

type EditPostFormProps = {
  post: Post
  slug: string
}

export function EditPostForm({ post, slug }: EditPostFormProps) {
  const router = useRouter();
  const [error, setError] = useState('')
  const [isPending, startTransition] = useTransition()
  const { uploading, removeExistingImage, handleImageChange, uploadImage } = useImageUpload()

  const handleSubmit = async (formData: FormData) => {
    setError('')
    
    startTransition(async () => {
      try {
        const imageUrl = await uploadImage()
        
        if (imageUrl) {
          formData.append('imageUrl', imageUrl)
        } else if (removeExistingImage) {
          formData.append('imageUrl', '')
        } else if (post.imageUrl) {
          formData.append('imageUrl', post.imageUrl)
        }
        
        const result = await updatePost(slug, formData)
        
        if (result?.error) {
          setError(result.error)
        } else if (result?.success && result.url) {
          router.push(`/posts/${result.url}`)
        }
      } catch (err: any) {
        setError(err.message || 'Произошла ошибка при обновлении поста')
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

        <ImageUpload 
          existingImageUrl={post.imageUrl} 
          onImageChange={handleImageChange}
          onError={setError}
        />

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isPending || uploading}
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
