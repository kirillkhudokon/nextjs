'use client'

import { use, Suspense } from 'react'
import type { Comment } from '@/types/comments'

type CommentsResult = 
  | { success: true; data: Comment[] }
  | { success: false; error: string }

async function fetchComments(postId: number): Promise<CommentsResult> {
  try {
    const response = await fetch(`http://localhost:3001/comments/post/${postId}`, { cache: 'no-store' })
    if (!response.ok) {
      return { success: false, error: `Failed to load comments (${response.status})` }
    }
    
    const data = await response.json()
    return { success: true, data }
  } catch (error) {
    console.log('Failed to fetch comments:', error)
    return { success: false, error: 'Some error. Please try again later.' }
  }
}

function CommentsList({ commentsPromise }: { commentsPromise: Promise<CommentsResult> }) {
  const result = use(commentsPromise)
  
  if (!result.success) {
    return (
      <div style={{
        padding: '16px',
        backgroundColor: '#fee',
        border: '1px solid #fcc',
        borderRadius: '6px',
        color: '#c33'
      }}>
        <strong>Error loading comments</strong>
        <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>{result.error}</p>
      </div>
    )
  }
  
  if (result.data.length === 0) {
    return <p style={{ color: '#666', fontStyle: 'italic' }}>No comments yet</p>
  }
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {result.data.map((comment) => (
        <div 
          key={comment.id}
          style={{
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '6px',
            backgroundColor: '#f9f9f9'
          }}
        >
          <p style={{ margin: 0, lineHeight: 1.5 }}>{comment.text}</p>
          <small style={{ color: '#888', fontSize: '12px' }}>
            {new Date(comment.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </small>
        </div>
      ))}
    </div>
  )
}

export default function Comments({ postId }: { postId: number }) {
  const commentsPromise = fetchComments(postId)
  
  return (
    <div style={{ marginTop: '24px' }}>
      <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Comments</h2>
      <Suspense fallback={
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          Loading comments...
        </div>
      }>
        <CommentsList commentsPromise={commentsPromise} />
      </Suspense>
    </div>
  )
}
