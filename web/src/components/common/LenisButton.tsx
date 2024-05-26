'use client'

import { cn } from '@/lib/utils'
import { useLenis } from 'lenis/react'

export default function LenisButton({
  className,
  children,
  href,
}: {
  className?: string
  children: React.ReactNode
  href?: string
}) {
  const lenis = useLenis()
  const handleClick = () => {
    lenis?.scrollTo(href ? href : 0, { duration: 1, lerp: 0.07 })
  }
  return (
    <button
      onClick={handleClick}
      className={cn('text-lg font-semibold', className)}
    >
      {children}
    </button>
  )
}
