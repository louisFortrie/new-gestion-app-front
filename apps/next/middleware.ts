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
  const url = new URL(req.url)
  const accountId = url.searchParams.get('accountId')
  if (token && accountId) {
    const settingsUrl = new URL('/settings', req.url)
    return NextResponse.redirect(settingsUrl)
  }

  if (!token && !req.url.endsWith('/login')) {
    const loginUrl = new URL('/login', req.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/stores-list, ',
    '/stats',
    '/settings',
    '/dashboard',
    '/manage',
    '/templates',
    '/',
  ],
}
