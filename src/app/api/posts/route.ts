import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/db'
import { posts } from '@/db/schema'
import { desc } from 'drizzle-orm'

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
