import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getServerAuthSession } from './lib/auth'

export async function proxy(request: NextRequest) {
  return await getServerAuthSession() ? NextResponse.next() : NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: [
    '/posts/create',
    '/posts/:slug/edit',
  ],
}