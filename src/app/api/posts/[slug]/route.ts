import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    const post = db.select().from(posts).where(eq(posts.url, slug)).get()
    
    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(post)
  } catch (error) {
    console.error('Error fetching post:', error)
    return NextResponse.json(
      { error: 'Failed to fetch post' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params
    
    const existingPost = db.select().from(posts).where(eq(posts.url, slug)).get()
    
    if (!existingPost) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    const body = await request.json()
    const { title, content, url } = body

    if (!title || !content || !url) {
      return NextResponse.json(
        { error: 'Title, content and url are required' },
        { status: 400 }
      )
    }

    const now = new Date().toISOString()

    const result = db
      .update(posts)
      .set({
        title,
        content,
        url,
        updatedAt: now
      })
      .where(eq(posts.url, slug))
      .returning()
      .get()

    if (!result) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(result)
  } catch (error: any) {
    
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' || error.message?.includes('UNIQUE')) {
      return NextResponse.json(
        { error: 'Post with this URL already exists' },
        { status: 409 }
      )
    }

    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params

    const result = db
      .delete(posts)
      .where(eq(posts.url, slug))
      .returning()
      .get()

    if (!result) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ message: 'Post deleted successfully' })
  } catch (error) {

    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
