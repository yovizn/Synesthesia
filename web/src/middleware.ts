'use server'

import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = request.cookies.get('refresh_token')?.value || ''
  const res = await fetch('http://localhost:8000/echos/v3', {
    method: 'GET',
    headers: {
      authorization: 'Bearer ' + token,
    },
  })

  const isValid = res.status == 500 ? false : true

  if (
    (request.nextUrl.pathname == '/login' ||
      request.nextUrl.pathname == '/register') &&
    isValid
  )
    return NextResponse.redirect(new URL('/', request.url))
  else if (request.nextUrl.pathname == '/' && !isValid) {

    return NextResponse.redirect(new URL('/login', request.url))
  } else return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/', '/login', '/register'],
}
