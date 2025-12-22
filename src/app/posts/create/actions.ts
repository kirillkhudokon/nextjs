'use server'

import { db } from '@/db'
import { posts } from '@/db/schema'
import { getServerAuthSession } from '@/lib/auth'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createPost(formData: FormData) {
  const session = await getServerAuthSession()
  const title = formData.get('title') as string
  const url = formData.get('url') as string
  const content = formData.get('content') as string

  if (!title || !content || !url) {
    return { error: 'Title, content and url are required' }
  }

  try {
    const now = new Date().toISOString()
    const result = db.insert(posts).values({
      title,
      content,
      url,
      UserId: session!.user.id as unknown as number, // не забудь пофиксить
      createdAt: now,
      updatedAt: now,
    }).returning().get()

    revalidatePath('/posts')
    return result;
  } catch (error: any) {
    console.log(error)
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE' || error.message?.includes('UNIQUE')) {
      return { error: 'Post with this URL already exists' }
    }
    return { error: 'Failed to create post' }
  }
}
