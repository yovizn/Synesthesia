'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthButton() {
  const pathname = usePathname()

  return (
    <div className={cn('flex gap-4', pathname.startsWith('/auth') && 'hidden')}>
      <Link
        className="flex h-9 items-center bg-foreground/90 px-4 py-2 uppercase text-background transition-all duration-200 hover:bg-foreground/70"
        href="/login"
      >
        sign in
      </Link>
    </div>
  )
}
