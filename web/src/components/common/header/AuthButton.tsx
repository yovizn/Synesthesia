'use client'

import { usePathname } from 'next/navigation'
import { deleteCookie } from 'cookies-next'

import { cn } from '@/lib/utils'
import SkeletonProfile from './SkeletonProfile'
import AuthProfile from './AuthProfile'
import { useAuthProvider } from '../AuthProvider'

export default function AuthButton() {
  const pathname = usePathname()
  const checkPath =
    pathname.startsWith('/auth/register') ||
    pathname.startsWith('/auth/login') ||
    pathname.startsWith('/auth/forget-password')
  const auth = useAuthProvider((state) => state)
  const handleLogout = () => {
    deleteCookie('refresh_token')
    deleteCookie('access_token')
    auth.resetUser()
    window.location.reload()
  }
  return (
    <div className={cn('flex items-center gap-6', checkPath && 'hidden')}>
      {auth.user.id ? (
        <AuthProfile
          user={auth.user}
          handleLogout={handleLogout}
        />
      ) : (
        <SkeletonProfile />
      )}
    </div>
  )
}
