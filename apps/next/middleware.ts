import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')
  console.log('cookie token', token)
  console.log('req.url', req.url)

  if (!token && req.url.endsWith('/')) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  } else if (token && req.url.endsWith('/')) {
    const storesListUrl = new URL('/stores-list', req.url)
    return NextResponse.redirect(storesListUrl)
  }

  if (!token && !req.url.endsWith('/login')) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/stores-list'],
}
