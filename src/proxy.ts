import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './lib/auth'
import { headers } from 'next/headers'

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers() 
  })

  const user = session?.user
  const { pathname } = request.nextUrl

  if (!user && pathname.startsWith('/profile')) {
    return NextResponse.redirect(new URL('/signin', request.url))
  }

  if (!user && pathname.startsWith('/detailed-news')) {
    const response = NextResponse.next()
    response.headers.set('x-user-authenticated', 'false')
    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/profile', '/detailed-news/:newsId*'],
}