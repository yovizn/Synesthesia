'use server'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ValidateType } from './types/validate.type'
import { API_BASE_URL } from './configs/env'
import { ForgetPasswordType } from './types/forget-password.type'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const token = request.cookies.get('refresh_token')?.value || ''
  const accessToken = request.cookies.get('access_token')?.value || ''
  const forgetPasswordToken = request.cookies.get('forget_password_token')?.value || ''
  const forgetPasswordAccessToken = request.cookies.get('forget_password_access_token')?.value || ''

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

  const forgetAccess = await fetch(`${API_BASE_URL}/echos/validations`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + forgetPasswordToken,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(async (res: Response) => {
    const data: ForgetPasswordType = await res.json()
    if (data.forget_password_access_token)
      response.cookies.set('forget_password_access_token', data.forget_password_access_token)
    console.log(data)
    return data
  })

  const isValidUser = user.title && accessToken
  const isLoginUser =
    request.nextUrl.pathname === '/auth/login' ||
    request.nextUrl.pathname === '/auth/register' ||
    request.nextUrl.pathname === '/auth/forget-password'
  const isValidForgetPassword = forgetPasswordAccessToken && forgetPasswordToken && forgetAccess.title
  const isForgetPassword = request.nextUrl.pathname.startsWith('/auth/forget-password')
  const isForgetPasswordPath = request.nextUrl.pathname === `/auth/forget-password/${forgetPasswordAccessToken}`
  const isDashboard = request.nextUrl.pathname.startsWith('/dashboard')

  if (isDashboard && !isValidUser) return NextResponse.redirect(new URL('/auth/login', request.url))
  if (isValidUser && isLoginUser) return NextResponse.redirect(new URL('/', request.url))
  if (isValidUser && isForgetPassword && !isValidForgetPassword) return NextResponse.redirect(new URL('/', request.url))
  if (isForgetPassword && forgetPasswordToken) return NextResponse.redirect(new URL('/auth/forget-password', request.url))

  return response
}

export const config = {
  matcher: ['/dashboard', '/auth/register', '/auth/login', '/auth/forget-password/:path*'],
}
