import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { desc } from 'drizzle-orm'
import { getServerAuthSession } from '@/lib/auth'

export async function GET() {
  try {
    const allPosts = db.select().from(posts).orderBy(desc(posts.createdAt)).all()
    
    return NextResponse.json({
      data: allPosts,
      total: allPosts.length
    })
  } catch (error) {
    console.error('Error fetching posts:', error)
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerAuthSession()
    
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
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

    const result = db.insert(posts).values({
      title,
      content,
      url,
      UserId: 1,
      createdAt: now,
      updatedAt: now
    }).returning().get()

    return NextResponse.json(result, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
