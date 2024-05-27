'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { defaultUser, useAuthProvider } from '@/stores/auth-provider'
import { deleteCookie } from 'cookies-next'

import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

export default function AuthButton() {
  const { user, setUser } = useAuthProvider()
  const pathname = usePathname()
  const checkPath = pathname.startsWith('/register') || pathname.startsWith('/login')
  const handleLogout = () => {
    deleteCookie('refresh_token')
    deleteCookie('access_token')
    setUser(defaultUser)
    window.location.reload()
  }

  return (
    <div className={cn('flex items-center gap-6', checkPath && 'hidden')}>
      <span className="block">{user.username}</span>

      {!user ? (
        <Link
          className="flex h-9 items-center bg-foreground/90 px-4 py-2 uppercase text-background transition-all duration-200 hover:bg-foreground/70"
          href="/login"
        >
          sign in
        </Link>
      ) : (
        <Dialog>
          <DialogTrigger asChild>
            <Button>Log out</Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader className="space-y-4">
              <DialogTitle>Are you sure you want to log out?</DialogTitle>
              <DialogDescription>
                To log out of your account, we need confirmation. Would you like to continue?
              </DialogDescription>
              <div className="flex w-full flex-col items-center justify-center gap-4 md:flex-row md:gap-6">
                <Button
                  onClick={handleLogout}
                  className="w-full"
                  variant={'default'}
                >
                  Yes
                </Button>
                <DialogClose asChild>
                  <Button
                    className="w-full"
                    variant={'outline'}
                  >
                    No
                  </Button>
                </DialogClose>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
