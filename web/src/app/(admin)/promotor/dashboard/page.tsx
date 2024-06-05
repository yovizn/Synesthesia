import { UserType } from '@/types/user.type'
import { jwtDecode } from 'jwt-decode'
import { Metadata } from 'next'
import { cookies } from 'next/headers'

export async function generateMetadata(): Promise<Metadata | undefined> {
  const token = cookies().get('access_token')?.value || ''
  if (token) {
    const user = jwtDecode(token) as UserType
    return {
      title: `${user.Promotor?.promotorName}`,
    }
  }
}
export default function DashboardPage() {
  return <div className="flex h-screen w-full items-center justify-center">DashboardPage</div>
}
