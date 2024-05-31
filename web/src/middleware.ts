'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { ValidateType } from './types/validate.type'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('refresh_token')?.value || ''
  const accessToken = request.cookies.get('access_token')?.value || ''
  const response = NextResponse

  const user = await fetch('http://localhost:8000/echos/v2', {
    method: 'GET',
    credentials: 'include',
    headers: {
      Authorization: 'Bearer ' + token,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(async (res: Response) => {
    const data: ValidateType = await res.json()
    response.next().cookies.set('access_token', data.access_token)
    return data
  })

  const access_token = user.access_token
  request.cookies.set('access_token', access_token)

  const isValid = (!user.title ? false : true) && accessToken

  if (request.nextUrl.pathname === '/dashboard' && !isValid)
    return response.redirect(new URL('/auth/login', request.url))
  if (request.nextUrl.pathname.startsWith('/auth') && isValid) return response.redirect(new URL('/', request.url))
  return response.next()
}

export const config = {
  matcher: ['/dashboard', '/auth/:path*'],
}
