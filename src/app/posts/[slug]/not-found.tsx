import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{ 
      padding: '40px 20px', 
      maxWidth: '600px', 
      margin: '0 auto',
      textAlign: 'center' 
    }}>
      <h2 style={{ fontSize: '32px', marginBottom: '16px' }}>404</h2>
      <h3 style={{ fontSize: '20px', marginBottom: '12px', color: '#666' }}>
        Post Not Found
      </h3>
      <p style={{ color: '#888', marginBottom: '24px' }}>
        The post you're looking for doesn't exist or has been removed.
      </p>
      <Link 
        href="/posts"
        style={{
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          textDecoration: 'none',
          fontSize: '14px',
          display: 'inline-block'
        }}
      >
        View all posts
      </Link>
    </div>
  )
}
