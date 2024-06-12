'use client'

import { GitHubLogoIcon, InstagramLogoIcon } from '@radix-ui/react-icons'
import Logo from '../Logo'
import ThemeSwitcher from '../ThemeSwitcher'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export default function Footer() {
  const pathname = usePathname()
  const path = pathname.startsWith('/auth')
  return (
    <div className={cn('w-full', path && 'hidden')}>
      <div className="mx-auto w-full max-w-screen-xl">
        <div className="flex h-[400px] md:h-[800px] flex-col space-y-9 py-9 px-6">
          <div className="h-full grow">
            <Logo className="text-lg" />
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="space-y-2.5">
              <p className="text-sm font-medium text-muted-foreground">
                <span className="font-light">&copy;</span> 2024 Synesthesia
              </p>
              <div className="flex items-center gap-4">
                <GitHubLogoIcon className="size-5 opacity-50" />
                <span className="block h-5 w-px bg-muted-foreground/50" />
                <InstagramLogoIcon className="size-5 opacity-50" />
              </div>
            </div>
            <div>
              <ThemeSwitcher />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
