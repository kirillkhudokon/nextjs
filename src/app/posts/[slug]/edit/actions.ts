'use server'

import { db } from '@/db'
import { posts } from '@/db/schema'
import { getServerAuthSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { eq } from 'drizzle-orm'

export async function updatePost(slug: string, formData: FormData) {
  const session = await getServerAuthSession()

  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const content = formData.get('content') as string

  if (!title || !content || !url) {
    return { error: 'Title, content and url are required' }
  }

  try {
    const existingPost = db.select().from(posts).where(eq(posts.url, slug)).get()
    
    if (!existingPost) {
      return { error: 'Post not found' }
    }

    if (existingPost.UserId !== session!.user.id) {
      return { error: 'Forbidden: You can only edit your own posts' }
    }

    const now = new Date().toISOString()

    const result = db.update(posts)
      .set({
        title,
        content,
        url,
        updatedAt: now
      })
      .where(eq(posts.url, slug))
      .returning()
      .get()

    revalidatePath('/posts')
    
    return { success: true, url: result.url }
  } catch (error: any) {
    return { error: 'Failed to update post' }
  }
}
