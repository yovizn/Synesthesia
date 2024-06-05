import { jwtDecode } from 'jwt-decode'
import { Metadata } from 'next'
import { cookies } from 'next/headers'
import { ReactNode } from 'react'

export async function generateMetadata(): Promise<Metadata> {
  const token = cookies().get('access_token')?.value || ''
  if (token) {
    const promotor = jwtDecode(token)
    return {
      title: {
        default: 'Promotor Synesthesia',
        template: '%s | Synesthesia',
      },
    }
  }

  return {
    title: 'Promotor',
  }
}

export default function PromotorLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
