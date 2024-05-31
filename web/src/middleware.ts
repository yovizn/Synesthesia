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
    response.cookies.set('access_token', data.access_token)
    console.log(data)
    return data
  })

  const access_token = user.access_token
  request.cookies.set('access_token', access_token)

  const isValid = (!user.title ? false : true) && accessToken

  if (request.nextUrl.pathname === '/dashboard' && !isValid)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  if (request.nextUrl.pathname.startsWith('/auth') && isValid) return NextResponse.redirect(new URL('/', request.url))
  return response
}

export const config = {
  matcher: ['/dashboard', '/auth/register', '/auth/login', '/auth/forget-password/:path*'],
}
