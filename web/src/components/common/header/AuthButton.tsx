'use client'

import { usePathname } from 'next/navigation'
import useAuthProvider from '@/stores/auth-provider'
import { deleteCookie } from 'cookies-next'

import { cn } from '@/lib/utils'
import SkeletonProfile from './SkeletonProfile'
import AuthProfile from './AuthProfile'

export default function AuthButton() {
  const pathname = usePathname()
  const checkPath = pathname.startsWith('/register') || pathname.startsWith('/login')
  const auth = useAuthProvider()

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
