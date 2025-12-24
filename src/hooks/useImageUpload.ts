import { useState } from 'react'

export function useImageUpload() {
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [removeExistingImage, setRemoveExistingImage] = useState(false)

  const handleImageChange = (file: File | null, shouldRemove: boolean) => {
    setImageFile(file)
    setRemoveExistingImage(shouldRemove)
  }

  const uploadImage = async (): Promise<string | null> => {
    if (!imageFile) return null

    setUploading(true)
    try {
      const uploadData = new FormData()
      uploadData.append('image', imageFile)
      
      const uploadRes = await fetch('/api/upload', {
        method: 'POST',
        body: uploadData
      })
      
      if (!uploadRes.ok) {
        const errorData = await uploadRes.json()
        throw new Error(errorData.error || 'Не удалось загрузить изображение')
      }
      
      const { url } = await uploadRes.json()
      setUploading(false)
      return url
    } catch (error) {
      setUploading(false)
      throw error
    }
  }

  return {
    imageFile,
    uploading,
    removeExistingImage,
    handleImageChange,
    uploadImage
  }
}
