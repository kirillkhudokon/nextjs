'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      textAlign: 'center' 
    }}>
      <h2 style={{ fontSize: '24px', marginBottom: '16px', color: '#c33' }}>
        Something went wrong!
      </h2>
      <p style={{ color: '#666', marginBottom: '24px' }}>
        {error.message || 'An unexpected error occurred'}
      </p>
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
        <button
          onClick={reset}
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}
        >
          Try again
        </button>
        <Link 
          href="/posts"
          style={{
            padding: '10px 20px',
            backgroundColor: '#eee',
            color: '#333',
            border: 'none',
            borderRadius: '6px',
            textDecoration: 'none',
            fontSize: '14px',
            display: 'inline-block'
          }}
        >
          Back to posts
        </Link>
      </div>
    </div>
  )
}
