import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ValidateType } from './types/validate.type'
import { API_BASE_URL } from './configs/env'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const token = request.cookies.get('refresh_token')?.value || ''
  const accessToken = request.cookies.get('access_token')?.value || ''

  const user = await fetch(`${API_BASE_URL}/echos/v2`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(async (res: Response) => {
    const data: ValidateType = await res.json()
    if (data.access_token) response.cookies.set('access_token', data.access_token)
    return data
  })

  const isValidUser = user.title && accessToken
  const isLoginUser =
    request.nextUrl.pathname == '/auth/login' ||
    request.nextUrl.pathname == '/auth/register' ||
    request.nextUrl.pathname.startsWith('/auth/forget-password')
  const isProtected =
    request.nextUrl.pathname.startsWith('/dashboard') || request.nextUrl.pathname.startsWith('/auth/edit')

  if (isProtected && !isValidUser) return NextResponse.redirect(new URL('/auth/login', request.url))
  if (isValidUser && isLoginUser) return NextResponse.redirect(new URL('/', request.url))

  return response
}

export const config = {
  matcher: ['/dashboard/:path*', '/auth/register', '/auth/forget-password/:path*', '/auth/login', '/auth/edit/:path*'],
}
