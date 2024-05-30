'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AuthLoginButton() {
  const pathname = usePathname()
  return (
    <Button
      asChild
      variant={'outline'}
      className={pathname.startsWith('/auth') ? 'hidden' : ''}
    >
      <Link href={'/auth/login'}>Login </Link>
    </Button>
  )
}
