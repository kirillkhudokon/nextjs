'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'

export default function CreatePost() {
  const router = useRouter()
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

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '0 20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', marginBottom: '8px' }}>Create New Post</h1>
        <Link href="/posts" style={{ color: '#0070f3', textDecoration: 'none' }}>
          ← Back to posts
        </Link>
      </div>

      {error && (
        <div style={{
          padding: '12px',
          backgroundColor: '#fee',
          border: '1px solid #fcc',
          borderRadius: '6px',
          color: '#c33',
          marginBottom: '20px'
        }}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              boxSizing: 'border-box'
            }}
            placeholder="Enter post title"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="url" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Slug *
          </label>
          <input
            id="url"
            name="url"
            type="text"
            required
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              boxSizing: 'border-box'
            }}
            placeholder="my-post-url"
          />
          <span style={{ fontSize: '12px', color: '#888', marginTop: '4px', display: 'block' }}>
            Will be used in the URL
          </span>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="content" style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
            Content *
          </label>
          <textarea
            id="content"
            name="content"
            rows={10}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ddd',
              borderRadius: '6px',
              boxSizing: 'border-box',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
            placeholder="Write your post content..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            width: '100%',
            padding: '12px',
            fontSize: '16px',
            fontWeight: '500',
            color: 'white',
            backgroundColor: isSubmitting ? '#999' : '#0070f3',
            border: 'none',
            borderRadius: '6px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
        >
          {isSubmitting ? 'Creating...' : 'Create Post'}
        </button>

      </form>
    </div>
  )
}
