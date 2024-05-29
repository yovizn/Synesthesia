'use client'

import { usePathname, useRouter } from 'next/navigation'
import { defaultUser, useAuthProvider } from '@/stores/auth-provider'
import { deleteCookie, getCookie } from 'cookies-next'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import SkeletonProfile from './SkeletonProfile'
import AuthProfile from './AuthProfile'

export default function AuthButton() {
  const pathname = usePathname()
  const checkPath = pathname.startsWith('/register') || pathname.startsWith('/login')
  const { user, setUser } = useAuthProvider()

  const handleLogout = () => {
    deleteCookie('refresh_token')
    deleteCookie('access_token')
    setUser(defaultUser)
    window.location.reload()
  }

  return (
    <div className={cn('flex items-center gap-6', checkPath && 'hidden')}>
      {user.id  ? (
        <AuthProfile
          user={user}
          handleLogout={handleLogout}
        />
      ) : (
        <SkeletonProfile/>
      )}
    </div>
  )
}
