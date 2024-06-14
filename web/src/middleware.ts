// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
// import { ValidateType } from './types/validate.type'
// import { API_BASE_URL } from './configs/env'

// export async function middleware(request: NextRequest) {
//   const response = NextResponse.next()
//   const token = request.cookies.get('refresh_token')?.value || ''
//   const accessToken = request.cookies.get('access_token')?.value || ''

//   const user = await fetch(`${API_BASE_URL}/echos/v2`, {
//     method: 'GET',
//     credentials: 'include',
//     headers: {
//       Authorization: 'Bearer ' + token,
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//     },
//   }).then(async (res: Response) => {
//     const data: ValidateType = await res.json()
//     if (data.access_token) response.cookies.set('access_token', data.access_token)
//     return data
//   })

//   const isValidUser = user.title && accessToken
//   const isLoginUser =
//     request.nextUrl.pathname == '/auth/login' ||
//     request.nextUrl.pathname == '/auth/register' ||
//     request.nextUrl.pathname == '/auth/promotor' ||
//     request.nextUrl.pathname.startsWith('/auth/forget-password')
//   const isProtected = request.nextUrl.pathname.startsWith('/auth/edit')
//   const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

//   if (isProtected && !isValidUser) {
//     return NextResponse.redirect(new URL('/auth/login', request.url))
//   }

//   if (isValidUser && isLoginUser) return NextResponse.redirect(new URL('/', request.url))

//   return response
// }

// export const config = {
//   matcher: ['/dashboard/:path*', '/auth/edit/:path*', '/auth/register', '/auth/forget-password/:path*', '/auth/login'],
// }

import { NextResponse, NextRequest } from 'next/server'
import { API_BASE_URL } from './configs/env'
import { ValidateType } from './types/validate.type'
import { jwtDecode } from 'jwt-decode'
import { UserType } from './types/user.type'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname
  const forget_password_token = request.cookies.get('forget_password_token')?.value || ''
  const refresh_token = request.cookies.get('refresh_token')?.value || '' // { expireIn: '20hr' }
  const access_token = request.cookies.get('access_token')?.value || '' // { expireIn: '15m' }
  const user = (await fetch(`${API_BASE_URL}/echos/v2`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + refresh_token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    next: { revalidate: 60 },
  }).then(async (res: Response) => {
    const data: ValidateType = await res.json()
    if (data.access_token) {
      const resolve = jwtDecode(data.access_token)
      response.cookies.set('access_token', data.access_token)
      return resolve
    }
    return data
  })) as UserType

  const isLogoutPath = pathname.startsWith('/auth/user')
  const isForgetPath = request.nextUrl.pathname.startsWith('/auth/forget-password/')
  const isPromotorPath = pathname.startsWith('/promotor/dashboard') || pathname.startsWith('/promotor/create-event')
  const isLoginPath =
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/register') ||
    pathname.startsWith('/auth/verify') ||
    pathname.startsWith('/auth/forget-password')

  // Login
  if (access_token && isLoginPath) return NextResponse.redirect(new URL('/', request.url))
  if (isPromotorPath && !user.Promotor?.id) return NextResponse.redirect(new URL('/promotor/register', request.url))

  if (pathname.startsWith('/promotor/register') && user.Promotor?.id)
    return NextResponse.redirect(new URL('/promotor/dashboard', request.url))

  // Logout
  if (!access_token && isLogoutPath) return NextResponse.redirect(new URL('/', request.url))
  if (!access_token && pathname.startsWith('/promotor/register'))
    return NextResponse.redirect(new URL('/', request.url))
  if (!forget_password_token && isForgetPath)
    return NextResponse.redirect(new URL('/auth/forget-password', request.url))

  return response
}

export const config = {
  matcher: ['/', '/events/:path*', '/transactions', '/auth/:path*', '/promotor/:path*'],
}
