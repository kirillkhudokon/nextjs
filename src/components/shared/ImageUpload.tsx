'use client'

import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ImageIcon from '@mui/icons-material/Image'

type ImageUploadProps = {
  existingImageUrl?: string | null
  onImageChange?: (file: File | null, shouldRemove: boolean) => void
  onError?: (error: string) => void
}

export function ImageUpload({ existingImageUrl, onImageChange, onError }: ImageUploadProps) {
  const [imagePreview, setImagePreview] = useState<string | null>(existingImageUrl || null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (!file.type.startsWith('image/')) {
        onError?.('Пожалуйста, выберите изображение')
        return
      }
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
      onImageChange?.(file, false)
    }
  }

  const removeImage = () => {
    setImagePreview(null)
    onImageChange?.(null, true)
  }

  return (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography variant="subtitle1" gutterBottom>
        Изображение (опционально)
      </Typography>
      
      {!imagePreview ? (
        <Button
          component="label"
          variant="outlined"
          startIcon={<ImageIcon />}
          fullWidth
        >
          Загрузить изображение
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
        </Button>
      ) : (
        <Box sx={{ position: 'relative', display: 'inline-block', width: '100%' }}>
          <Box
            component="img"
            src={imagePreview}
            alt="Preview"
            sx={{
              width: '100%',
              maxHeight: 300,
              objectFit: 'contain',
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider'
            }}
          />
          <IconButton
            onClick={removeImage}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'background.paper',
              '&:hover': { bgcolor: 'error.main', color: 'white' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      )}
    </Box>
  )
}
