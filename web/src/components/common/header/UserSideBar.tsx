'use client'

import Link from 'next/link'
import { useAuthProvider } from '../AuthProvider'
import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'
import { ArrowRightLeft, Settings, Ticket, XIcon } from 'lucide-react'

export default function UserSideBar() {
  const { user } = useAuthProvider((state) => state)
  const pathname = usePathname()
  const [isActive, setIsActive] = useState(false)

  return (
    <aside className="bg-muted/50">
      <div className={cn('w-full transition-all duration-200', isActive ? 'w-28' : 'md:w-96')}>
        <nav className="flex flex-col items-start justify-normal p-4 md:h-[calc(100vh-88px)] md:items-start md:justify-between md:p-6">
          <div className="w-full overflow-hidden">
            <p
              className={cn(
                'hidden text-3xl font-light uppercase transition-transform duration-200 md:inline-block',
                isActive ? '-translate-x-full' : '',
              )}
            >
              Profile
            </p>
            <div className="flex w-full flex-row items-center justify-between md:flex-col md:items-start md:gap-6 md:py-16">
              <Link
                className={cn(
                  'relative flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground/70 md:w-full md:text-base',
                  pathname === `/auth/user/${user.username}/transactions` ? 'text-foreground' : '',
                )}
                href={`/auth/user/${user.username}/transactions`}
              >
                <span
                  className={cn('inline-block transition-transform duration-200', isActive ? '-translate-x-full' : '')}
                >
                  Transactions
                </span>
                <ArrowRightLeft className="right-6 size-5 md:absolute" />
              </Link>
              <Link
                className={cn(
                  'relative flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground/70 md:w-full md:text-base',
                  pathname === `/auth/user/${user.username}/tickets` ? 'text-foreground' : '',
                )}
                href={`/auth/user/${user.username}/tickets`}
              >
                <span
                  className={cn('inline-block transition-transform duration-200', isActive ? '-translate-x-full' : '')}
                >
                  Tickets
                </span>
                <Ticket className="right-6 size-5 md:absolute" />
              </Link>
              <Link
                className={cn(
                  'relative flex items-center gap-2 text-sm font-medium tracking-wide text-muted-foreground hover:text-foreground/70 md:w-full md:text-base',
                  pathname === `/auth/user/${user.username}/settings` ? 'text-foreground' : '',
                )}
                href={`/auth/user/${user.username}/settings`}
              >
                <span
                  className={cn('inline-block transition-transform duration-200', isActive ? '-translate-x-full' : '')}
                >
                  Settings
                </span>
                <Settings className="right-6 size-5 md:absolute" />
              </Link>
            </div>
          </div>
          <Button
            onClick={() => setIsActive(!isActive)}
            className={cn('hidden w-full md:flex', isActive ? 'justify-center' : 'justify-between')}
          >
            <span className={isActive ? 'hidden' : ''}>Minimize</span>
            <XIcon className="size-5" />
          </Button>
        </nav>
      </div>
    </aside>
  )
}
